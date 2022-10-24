import { ColorResult, TwitterPicker } from 'react-color';
import { useSelector, useDispatch } from '../../redux/hooks';
import {
  ADD_ROW,
  CHANGE_ROW_COLOR,
  CLEAR_ROW,
  REMOVE_ROW
} from '../../redux/actions';
import Modal from 'react-modal';
import { COLORS } from '../../utils/constants';
import { AnyFunction, initialState, StateAction } from '../../utils/types';
import { Close } from '../icons';

interface Props {
  isOpen: boolean;
  color: string;
  name: string;
  rowIndex: number;
  setIsOpen: StateAction;
  changeName: AnyFunction;
}

export default function SettingsModal({
  isOpen,
  color,
  name,
  rowIndex,
  setIsOpen,
  changeName
}: Props) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state).tierbuilder ?? initialState;

  const addRow = (direction: string) => {
    dispatch({ type: ADD_ROW, rowIndex, direction });
  }

  const removeRow = () => {
    setIsOpen(false);
    dispatch({ type: REMOVE_ROW, rowIndex });
  }

  const clearRow = () => {
    dispatch({ type: CLEAR_ROW, rowIndex });
  }

  const changeRowColor = (newColor: ColorResult) => {
    dispatch({
      type: CHANGE_ROW_COLOR,
      rowIndex,
      color: newColor.hex
    });
  }

  const closeModal = () => setIsOpen(false)

  return (
    <Modal
      className="relative flex flex-col space-y-4 mx-auto items-center text-center md:w-2/3 lg:w-1/2 bg-white pt-2 pb-10 rounded-sm"
      isOpen={isOpen}
      style={{
        overlay: {
          backgroundColor: '#00000066'
        }
      }}
      onRequestClose={closeModal}
    >
      <Close
        className="absolute top-0 right-0 cursor-pointer mr-1 opacity-30 hover:opacity-60 hover:scale-110"
        size={30}
        onClick={closeModal}
      />
      <section className="space-y-1">
        <label className="text-lg font-semibold" htmlFor="colorpicker">
          Choose Label Background
        </label>
        <TwitterPicker
          className="picker"
          color={color}
          colors={[...COLORS, color]}
          triangle="hide"
          onChange={(newColor) => changeRowColor(newColor)}
        />
      </section>
      <section className="space-y-1">
        <label className="text-lg font-semibold" htmlFor="row-label">
          Edit Label Text
        </label>
        <textarea
          className="border-neutral-500 border px-1 w-full"
          name="row-label"
          value={name}
          onChange={(e) => changeName(e.target.value)}
          autoFocus />
      </section>
      <section className="flex space-x-3 justify-center w-full">
        <div className="flex flex-col space-y-2 w-1/3">
          <button onClick={() => addRow('above')}>
            Add row above
          </button>
          <button onClick={() => addRow('below')}>
            Add row below
          </button>
        </div>
        <section className="flex flex-col space-y-2 w-1/3">
          <button onClick={clearRow}>
            Clear row
          </button>
          <button onClick={removeRow} disabled={data.rows.length < 2}>
            Remove row
          </button>
        </section>
      </section>
    </Modal>
  );
}