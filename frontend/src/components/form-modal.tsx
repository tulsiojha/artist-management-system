import Modal from "./modal";
import { DefaultValues, useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect } from "react";

interface IFormModal<T extends z.ZodSchema<any>> {
  initialValues?: DefaultValues<Partial<z.infer<T>>>;
  schema: T;
  children?: (form: UseFormReturn<z.infer<T>>) => ReactNode;
  open?: boolean;
  openChange?: (open: boolean) => void;
  header?: ReactNode;
  onSubmit: (e: z.infer<T>) => void;
  height?: string | number;
  width?: string | number;
}

const FormModal = <T extends z.ZodSchema<any>>({
  initialValues,
  schema,
  children,
  open,
  openChange,
  header,
  onSubmit,
  height,
  width,
}: IFormModal<T>) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });
  useEffect(() => {
    form.reset(initialValues);
  }, [initialValues, form]);
  return (
    <Modal
      open={open}
      openChange={openChange}
      header={header}
      width={width}
      height={height}
    >
      <form
        className="flex flex-col h-full overflow-y-auto overflow-x-hidden md:overflow-x-auto p-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {children?.(form)}
      </form>
    </Modal>
  );
};

export default FormModal;
