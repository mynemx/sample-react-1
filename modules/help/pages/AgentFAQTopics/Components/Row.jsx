import React, { Component } from 'react';

import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
import DescriptionIcon from '@material-ui/icons/Description';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

class Row extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
        };

        this.inputRef = React.createRef();
    }

    focus = () => {
        this.setState({ show: true }, () => this.inputRef.current.focus());
    };

    render() {
        const {
            item,
            tag,
            handleSubmit,
            handleChange,
            removetags,
        } = this.props;
        const { show } = this.state;
        return (
            <tr>
                <td className='text-left d-flex name'>
                    <DoubleArrowIcon className='mr-3 icn' />
                    <CreateIcon
                        className='edit_tag'
                        onClick={() => this.focus()}
                    />

                    {show ? (
                        <form
                            action=''
                            onSubmit={(e) => {
                                handleSubmit(e, item?.id);
                                this.setState({ show: false });
                            }}
                        >
                            <input
                                ref={this.inputRef}
                                type='text'
                                name='name'
                                id=''
                                className='inline-input'
                                value={tag?.name ? tag.name : item.name}
                                onChange={(e) =>
                                    handleChange(e.target.name, e.target.value)
                                }
                                onBlur={() => {
                                    this.setState({ show: false });
                                }}
                            />
                        </form>
                    ) : (
                        <span className='tag_name' onClick={() => this.focus()}>
                            {item.name}
                        </span>
                    )}
                </td>
                <td className='text-left w20'>
                    <span className='tag_name'>1</span>
                </td>
                <td className='text-left w20 '>
                    <span className='d-flex align-items-center gray'>
                        <PersonIcon />
                        <span>0</span>
                    </span>
                </td>
                <td className='text-left w20'>
                    <span className='d-flex align-items-center gray'>
                        <DescriptionIcon />
                        <span>0</span>
                    </span>
                </td>
                <td className='text-right'>
                    <span>
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            className='mr-3 icn icn-opacity'
                            onClick={() => removetags(item.id)}
                        />
                    </span>
                </td>
            </tr>
        );
    }
}

export default Row;
