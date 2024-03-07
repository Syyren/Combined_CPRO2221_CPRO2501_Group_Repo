

export default function TictactoeGame(props) {
  if (props.gameId) {
  }
  return (
    <div class="containe ratio ratio-1x1">
      <div class="row">
        <div class="col-4 border-end-4 border-bottom-4 ratio ratio-1x1"></div>
        <div class="col-4 border-end-4 border-bottom-4 border-start-4 ratio ratio-1x1"></div>
        <div class="col-4 border-start-4 border-bottom-4 ratio ratio-1x1"></div>
      </div>

      <div class="row">
        <div class="col-4 border-end-4 border-bottom-4 border-top-4 ratio ratio-1x1"></div>
        <div class="col-4 border-end-4 border-bottom-4 border-start-4 border-top-4 ratio ratio-1x1"></div>
        <div class="col-4 border-start-4 border-bottom-4 border-top-4 ratio ratio-1x1"></div>
      </div>

      <div class="row">
        <div class="col-4 border-end-4 border-top-4 ratio ratio-1x1"></div>
        <div class="col-4 border-end-4 border-top-4 border-start-4 ratio ratio-1x1"></div>
        <div class="col-4 border-start-4 border-top-4 ratio ratio-1x1"></div>
      </div>
    </div>
  );
}
