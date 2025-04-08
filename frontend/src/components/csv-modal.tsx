"use client";
import Modal from "./modal";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import List from "./list";
import { usePagination } from "@/hooks/use-pagination";
import Button from "./button";
import { toast } from "sonner";
import handleErrors from "@/utils/handleErrors";
import { formatDateToString, importCSV } from "@/utils/commons";
import { useRouter } from "next/navigation";
import { artistSchema } from "@/lib/schemas";
import { artist } from "@/lib/api-client";

const CSVModal = ({
  open,
  openChange,
}: {
  open?: boolean;
  openChange?: () => void;
}) => {
  const form = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const items = [] as Record<string, string | number | Date>[];
  const itemsPerPage = 7;
  const [loading, setLoading] = useState(false);

  const page = usePagination({ items, itemsPerPage });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      importCSV({
        file,
        onParse: (d) => {
          page.setItems(d);
        },
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    e.stopPropagation();

    const a = [];
    try {
      for (let i = 0; i < page.items.length; i++) {
        const item = page.items[i];
        artistSchema.parse(page.items[i]);
        a.push({ ...item, dob: formatDateToString(item.dob as string) });
      }
      if (a.length) {
        await artist.createMany({ artists: a }, () => {
          openChange?.();
          page.setItems([]);
          form.current?.reset();
          router.refresh();
        });
      }
    } catch (err) {
      toast.error(handleErrors(err), { richColors: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    page.setItems([]);
  }, [open]);

  return (
    <Modal
      open={open}
      openChange={openChange}
      header={`Import Artist CSV`}
      height={page.items.length > 0 ? "515px" : "250px"}
      width={page.items.length > 0 ? "750px" : "500px"}
    >
      <form
        ref={form}
        className="flex flex-col gap-2 p-4"
        onSubmit={handleSubmit}
      >
        <div className="h-full flex flex-col">
          {page.items.length ? (
            <>
              <List
                totalItems={page.items.length}
                columns={[
                  { id: "user_id", label: "User id", width: "70px" },
                  { id: "name", label: "Full name", width: "200px" },
                  {
                    id: "first_release_year",
                    label: "First release year",
                    width: "150px",
                  },
                  {
                    id: "no_of_albums_released",
                    label: "No of albums",
                    width: "150px",
                  },
                ]}
                onPageChanged={(e) => page.setPageNumber(e)}
                page={page.pageNumber}
                perPage={itemsPerPage}
                //@ts-ignore
                rows={page.page.map((ic) => {
                  return {
                    columns: {
                      user_id: { render: () => ic.user_id },
                      name: { render: () => ic.name },
                      first_release_year: {
                        render: () => ic.first_release_year,
                      },
                      no_of_albums_released: {
                        render: () => ic.no_of_albums_released || "-",
                      },
                    },
                    id: ic.user_id,
                  };
                })}
              />
              <div className=" -mx-4 pt-4 px-4 flex flex-row justify-end gap-2">
                <Button variant="primary" type="submit" loading={loading}>
                  Import
                </Button>
                <Button variant="secondary" type="reset" onClick={openChange}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full max-w-xs h-32 border-2 border-dashed rounded-2xl cursor-pointer bg-surface hover:bg-surface-hover border-surface-border transition"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-3 text-gray-400"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16V4m0 0L3 8m4-4l4 4m5 4v8m0 0l-4-4m4 4l4-4"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-text-surface">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-text-surface">.csv</p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default CSVModal;
