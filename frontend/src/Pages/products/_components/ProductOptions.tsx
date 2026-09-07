import type { Product } from "../_types/product";

interface ProductOptionsProps {
  product: Product;

  selectedColor: string;
  selectedStorage: string;
  selectedRam: string;
  selectedVersion: string;

  onColorChange: (value: string) => void;
  onStorageChange: (value: string) => void;
  onRamChange: (value: string) => void;
  onVersionChange: (value: string) => void;
}

const ProductOptions = ({
  product,
  selectedColor,
  selectedStorage,
  selectedRam,
  selectedVersion,
  onColorChange,
  onStorageChange,
  onRamChange,
  onVersionChange,
}: ProductOptionsProps) => {
  const variants = product.variants;

  const renderOption = (
    value: string,
    selected: boolean,
    onClick: () => void,
  ) => {
    return (
      <button
        key={value}
        type="button"
        onClick={onClick}
        className={`min-w-[72px] rounded-lg border px-3 py-2 text-xs font-medium transition ${
          selected
            ? "border-gray-900 bg-gray-900 text-white"
            : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
        }`}
      >
        {value}
      </button>
    );
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-5">
        <h2 className="text-sm font-bold text-gray-900">Choose your product</h2>

        <p className="mt-1 text-[11px] text-gray-400">
          Select the configuration you want
        </p>
      </div>

      {/* Color */}
      {variants?.colors && variants.colors.length > 0 && (
        <div className="border-b border-gray-100 pb-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-900">Color</span>

            {selectedColor && (
              <span className="text-[11px] text-gray-500">{selectedColor}</span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {variants.colors.map((color) =>
              renderOption(color, selectedColor === color, () =>
                onColorChange(color),
              ),
            )}
          </div>
        </div>
      )}

      {/* Storage */}
      {variants?.storages && variants.storages.length > 0 && (
        <div className="border-b border-gray-100 py-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-900">Storage</span>

            {selectedStorage && (
              <span className="text-[11px] text-gray-500">
                {selectedStorage}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {variants.storages.map((storage) =>
              renderOption(storage, selectedStorage === storage, () =>
                onStorageChange(storage),
              ),
            )}
          </div>
        </div>
      )}

      {/* RAM */}
      {variants?.rams && variants.rams.length > 0 && (
        <div className="border-b border-gray-100 py-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-900">RAM</span>

            {selectedRam && (
              <span className="text-[11px] text-gray-500">{selectedRam}</span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {variants.rams.map((ram) =>
              renderOption(ram, selectedRam === ram, () => onRamChange(ram)),
            )}
          </div>
        </div>
      )}

      {/* Version */}
      {variants?.versions && variants.versions.length > 0 && (
        <div className="pt-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-900">Version</span>

            {selectedVersion && (
              <span className="text-[11px] text-gray-500">
                {selectedVersion}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {variants.versions.map((version) =>
              renderOption(version, selectedVersion === version, () =>
                onVersionChange(version),
              ),
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductOptions;
