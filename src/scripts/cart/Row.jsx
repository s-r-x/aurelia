import { h } from 'hyperapp';

const Row = (_, Child) => {
  return (
    <div class="cart--table-row ">
      {Child}
    </div>       
  )
};
export default Row;
