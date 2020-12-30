import React, { Component } from 'react';

import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
import DescriptionIcon from '@material-ui/icons/Description';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye } from '@fortawesome/free-regular-svg-icons';
import Form from './Form';                                  

class TableRow extends Component {
    constructor() {
        super();
    }


    render() {
        const {
            item = {},
            agentFAQTopic={},
            show = false,
            errors,
            handleEdit,
            handleClearMode,
            handleSubmit,
            handleChange,
            handleRemove,
        } = this.props;
        return (
            <tr>
                <td className='text-left d-flex name'>
                    <DoubleArrowIcon className='mr-3 icn' />
                    <CreateIcon
                        className='edit_tag'
                        onClick={() => (show && agentFAQTopic.id && item.id == agentFAQTopic.id) ? handleClearMode() : handleEdit(item)}
                    />

                    {show && agentFAQTopic.id && item.id == agentFAQTopic.id? (

                        <Form 
                            agentFAQTopic={agentFAQTopic}
                            errors={errors}
                            onChange={handleChange}
                            onSubmit={(e) => {
                                handleSubmit(e, item.id);
                                this.setState({ show: false });
                            }}
                        />
                    ) : (
                        <span className='tag_name' onClick={() => handleEdit(item)}>
                            {item.label}
                        </span>
                    )}
                </td>
                <td className='text-left w20'>
                    <span className='tag_name'>{item.tagItems && item.tagItems.length}</span>
                </td>
                <td className='text-left w20'>
                    <span className='d-flex align-items-center gray'>
                        <DescriptionIcon />
                        <span>{item.faqs && item.faqs.length}</span>
                    </span>
                </td>
                <td className='text-right'>
                    <span>
                        <FontAwesomeIcon
                            icon={faEye}
                            className='mr-3 icn icn-opacity'
                            onClick={() => handleRemove(item.id)}
                        />
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            className='mr-3 icn icn-opacity'
                            onClick={() => handleRemove(item.id)}
                        />
                    </span>
                </td>
            </tr>
        );
    }
}

export default TableRow;
