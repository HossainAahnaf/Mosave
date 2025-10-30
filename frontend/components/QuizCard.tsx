type QuizCardProps = {
  title: string;
  description: string;
  badge?: string;
  onStart?: () => void;
};

export const QuizCard = ({ title, description, badge, onStart }: QuizCardProps) => {
  return (
    <div className="card flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        {badge ? <span className="rounded-full bg-primary-100 px-3 py-1 text-xs text-primary-600">{badge}</span> : null}
      </div>
      <p className="text-sm text-slate-600">{description}</p>
      <button
        type="button"
        className="mt-auto w-fit rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-glow hover:bg-primary-600"
        onClick={onStart}
      >
        Start Quick Lesson
      </button>
    </div>
  );
};

export default QuizCard;
