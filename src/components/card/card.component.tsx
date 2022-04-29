import "./card.component.css"

export function Card(props: any) {
    return (
        <div className="card">
            <div className="body">
                <img className="avatar" src="https://i.imgur.com/xASbbpf.gif" alt="" />
                <div className="container">
                    <h4><b className="title-secondary">{props.name}</b></h4>
                    <span>ID: {props.id}</span>
                </div>
            </div>
            <div className="footer">
                <span>income: <span>{props.income}</span></span>
            </div>
        </div>
    );
}