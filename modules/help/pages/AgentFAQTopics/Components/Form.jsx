import React, { useCallback, useRef } from 'react';

import './Form.scss';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Row from './Row';

const Form = ({
    tags,
    tag,
    onChange,
    handleSubmit,
    removetags,
    resetInput,
}) => {
    const addInputRef = useRef('');
    const handleChange = useCallback(
        (name, value) => {
            if (value !== tag[name]) {
                onChange(name, value);
            }
        },
        [onChange, tag]
    );

    //     const resetInput = () => {
    //         return (addInputRef.current.value = '');
    //     };

    const props = {
        tag,
        handleSubmit,
        handleChange,
        removetags,
    };

    return (
        <div className='list_page'>
            <div className='add_new_tag'>
                <AddCircleIcon className='addNewIcon' />
                <form
                    action=''
                    onSubmit={(e) => {
                        handleSubmit(e);
                        resetInput();
                    }}
                >
                    <input
                        ref={addInputRef}
                        type='text'
                        name='name'
                        className='add_new_tag_input'
                        placeholder='Add Tag'
                        value={tag.name}
                        onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                        }
                    />
                </form>
            </div>
            <table className='table table-hover'>
                <tbody>
                    {tags.map((item, index) => (
                        <Row key={index} item={item} {...props} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Form;
