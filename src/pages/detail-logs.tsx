import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { selectFamilyById } from "../slices/family-slice";
import { useParams } from "react-router";
import { Menu } from "../components/navigation/menu";
import { DetailTable } from "../components/settings/detail-table";

export function DetailLogs() {
  const { familyId } = useParams<{ familyId: string }>();
  const family = useSelector((state: RootState) =>
    selectFamilyById(state, familyId || "")
  );
  return (
    <div>
      <Menu></Menu>
      <h1>Detailed logs for {family?.name}</h1>
      <DetailTable logs={family?.logs || []} familyId={familyId || ''} />
    </div>
  );
}
