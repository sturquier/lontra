import { MouseEvent, MutableRefObject } from 'react';

import { Button } from '@components/index';
import './modal.scss';

interface IModalProps {
  dialogRef: MutableRefObject<HTMLDialogElement | null>;
  onCloseCallback: () => void;
}

export default function Modal ({ dialogRef, onCloseCallback }: IModalProps) {
  const applyFilters = (): void => {
    console.log('TODO')
  }

  return (
    <dialog className="modal" ref={dialogRef} onClick={onCloseCallback}>
      <div className="modal-content" onClick={(event: MouseEvent<HTMLDivElement>): void => event.stopPropagation()}>
        <h3 className='modal-content-title'>Filter articles</h3>
        <div className='modal-content-filters'>
          <div className='modal-content-filters-filter'>
            <h4>Websites :</h4>
            <div>TODO</div>
          </div>
          <div className='modal-content-filters-filter'>
            <h4>Favorite :</h4>
            <div>TODO</div>
          </div>
          <div className='modal-content-filters-filter'>
            <h4>Tags :</h4>
            <div>TODO</div>
          </div>
        </div>
        <div className="modal-content-footer">
          <Button onClickCallback={onCloseCallback}>CANCEL</Button>
          <Button onClickCallback={applyFilters}>APPLY FILTERS</Button>
        </div>
      </div>
    </dialog>
  )
}