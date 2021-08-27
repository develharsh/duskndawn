const Loading = () => {
    return (
        <div className='loading' style={{
            position:'fixed',width:'100%',height:'100%',textAlign:'center',
             background: '#0008', color: '#fff', top: 0, left: 0, zIndex: 5 }}>
            <svg width="205" height="250" viewBox="0 0 40 50">
                <polygon strokeWidth='1' stroke='#fff' fill='none' points='20, 1 40,40 1,40'>
                </polygon>
                <text fill='#fff' x='4' y='47'>Loading</text>
            </svg>
        </div>
    )
}
export default Loading