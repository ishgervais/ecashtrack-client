import { ModelStatus } from "src/types";
import { getStatuses } from "src/util/customFunction";

type StatusBadgeProps = {
  status: string
}
export default function StatusBadge(props: StatusBadgeProps) {
  // model statuses
  const statuses: ModelStatus[] = getStatuses(props.status);

  return (
    <>
      {statuses.map((item: ModelStatus, i: number) => {
        return (
          item.status === props.status && (
            <div key={i} className={`capitalize bg-${item.color}-100 rounded-full py-1 px-3 flex items-center gap-2 justify-center`}>
              <div className={`bg-${item.color}-500 w-2 h-2 rounded-full`}></div>
              <span className="text-xs">{props.status}</span>
            </div>


          )
        );
      })}



    </>
  )
}