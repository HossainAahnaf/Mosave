type GoalCardProps = {
  title: string;
  targetAmount: number;
  currentAmount: number;
  dueDate: string;
  streak: number;
};

const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

export const GoalCard = ({ title, targetAmount, currentAmount, dueDate, streak }: GoalCardProps) => {
  const progress = Math.min(100, Math.round((currentAmount / targetAmount) * 100));

  return (
    <div className="card flex flex-col gap-4 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500">Due {new Date(dueDate).toLocaleDateString()}</p>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-600">
          🔥 {streak}-day streak
        </span>
      </div>
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>{formatCurrency(currentAmount)} saved</span>
        <span>{formatCurrency(targetAmount)} goal</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-primary-500" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-sm text-slate-600">
        Keep going! Mo will unlock a bonus lesson when you reach 80%.
      </p>
    </div>
  );
};

export default GoalCard;
