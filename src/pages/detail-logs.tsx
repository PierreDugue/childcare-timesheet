import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { DetailTable } from "../components/logging/detail-table";
import { selectFamilyById } from "../slices/familySlice";
import { useParams } from "react-router";
import { Menu } from "../components/menu";

export function DetailLogs() {
  const { familyId } = useParams<{ familyId: string }>();
  const family = useSelector((state: RootState) =>
    selectFamilyById(state, familyId || "")
  );
  return (
    <div>
      <Menu></Menu>
      <h1>Detailed logs for {family?.name}</h1>
      <DetailTable logs={family?.logs || []} />
    </div>
  );
}
