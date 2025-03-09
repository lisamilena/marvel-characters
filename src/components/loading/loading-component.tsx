import clsx from 'clsx';

const COLORS = {
  red: 'border-red-600',
  white: 'border-white',
};

export function Loading({
  color = 'white',
  className,
}: {
  color?: keyof typeof COLORS;
  className?: string;
}) {
  return (
    <div className={clsx('flex items-center justify-center py-4', className)}>
      <div
        className={clsx(
          'h-12 w-12 animate-spin rounded-full border-4 border-b-transparent border-l-transparent',
          COLORS[color]
        )}
      />
    </div>
  );
}
