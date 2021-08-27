
const Toast = ({ msg, handleShow, bgColor }) => {
    M.toast({ html: msg.msg, classes: bgColor })
    return (<></>
    )
}
export default Toast