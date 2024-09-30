
import {Modal} from 'antd'
const CustomModal = (props) => {
    const {open,performAction,hideModal,title}=props;
  return (
    <Modal
      title="Confirmation"
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText="Ok"
      cancelText="Cancel"
    >
      <p>{title}</p>
    </Modal>
  )
}

export default CustomModal
