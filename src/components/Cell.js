export default function Cell({ cellId, content, onCellClick }) {
  let move = "";
  if (content === 1) move = "✅";
  else if (content === -1) move = "❌";

  return (
    <div className="cell bg-slate-100 border border-slate-300" onClick={() => onCellClick(cellId)}>
      {move}
    </div>
  );
}
