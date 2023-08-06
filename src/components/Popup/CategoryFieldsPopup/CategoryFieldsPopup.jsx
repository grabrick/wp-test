import { useEffect, useState } from 'react';
import m from './CategoryFieldsPopup.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFieldsData } from '../../../redux/slices/fieldsSlice';
import FieldsComponent from './FieldsComponent/FieldsComponent';
import PreLoader from '../../../assets/extra/PreLoader/PreLoader';
import { useServerError } from '../../../assets/extra/ServerErrorProvider/ServerErrorProvider';

function CategoryFieldsPopup({ close, items }) {
    const [isVisible] = useState(false)
    const { addError } = useServerError();
    const dispatch = useDispatch()
    const { fieldData, fieldLoading, fieldError } = useSelector(state => state.fieldsSlice)
    useEffect(() => {
        if (fieldError !== null) {
            addError(fieldError);
        } else {
            dispatch(fetchFieldsData(`/v1/service/${items}`))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, items])

    if (fieldError !== null) {
        return null;
    }
    return (
        <div onClick={() => close(false)} className={isVisible ? m.notVisible : m.visible}>
            {fieldLoading ? (
                <div className={m.wrapper}>
                  <PreLoader h="80" w="200" color="black" ariaLabel="loading" />
                </div>
            ) : (
                <div className={m.wrapper} onClick={(e) => e.stopPropagation()}>
                    <FieldsComponent items={fieldData} />
                </div>
            )}
        </div>
    );
}

export default CategoryFieldsPopup;