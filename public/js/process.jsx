var listPointer;

class Node extends React.Component {
    render() {
        return (
            <div className={"div-note"}>
                {this.props.children}
            </div>
        );
    }
}

class List extends React.Component {
    constructor(props) {
        super(props);

        listPointer = this;

        this.state = {items: []};
    }

    actionBtnInput() {
        var btn = document.getElementById("btnAdd");

        if (!btn.innerText.localeCompare("Open Input")) {
            ReactDOM.render(<InputElement/>, document.getElementById("list-input"));
            btn.innerText = "Close Input";
        } else {
            ReactDOM.unmountComponentAtNode(document.getElementById("list-input"));
            btn.innerText = "Open Input";
        }
    }

    render() {
        return (
            <div className={"div-list"}>
                {
                    this.state.items.map((note, index) => {
                            return <Node key={index}>{note}</Node>
                        }
                    )
                }

                <button id="btnAdd" onClick={() => this.actionBtnInput()}>Open Input</button>
                <div id="list-input" />
            </div>
        );
    }

    componentDidMount() {
        var current = this;
        $.post("/getNodes", (data) => {
            current.setState({items: data});
        });
    }
}

class InputElement extends React.Component {
    send() {
        listPointer.state.items.push(this.refs.input.value);
        listPointer.setState(listPointer.state);
        this.refs.input.value = "";
    }

    render() {
        return (
            <div className={"div-input"}>
                <input type="text" ref={"input"} placeholder={"Give something"}/>
                <button onClick={() => this.send()}>Okay</button>
            </div>
        );
    }
}

ReactDOM.render(
    <div>
        <List/>
    </div>,
    document.getElementById("root")
);