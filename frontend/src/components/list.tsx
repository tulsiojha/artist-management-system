const List = ({
  rows,
  columns,
}: {
  rows: any[];
  columns: { className?: string; width?: string; label: string; id: string }[];
}) => {
  return (
    <div className="w-full border border-gray-200 rounded shadow">
      <div className="flex flex-row items-center w-full px-2 py-1 border-b-2 border-gray-300 font-bold">
        {columns.map((col) => {
          return (
            <div
              key={col.id}
              className={col.className}
              style={{ width: col.width }}
            >
              {col.label}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col w-full">
        {rows.map((row) => {
          return (
            <div
              key={row.id}
              className="flex flex-row items-center w-full px-2 py-1 last:border-0 border-b-1 border-gray-200"
            >
              {columns.map((col) => (
                <div
                  key={col.id}
                  className={col.className}
                  style={{ width: col.width }}
                >
                  {row.columns[col.id]?.render()}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
