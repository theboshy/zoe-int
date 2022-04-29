import "./theme.button.css"

export function ThemeButtonPrimary(props: any) {
    return (
        <button type="submit" className={"btn btn-primary form-main-position interaction-color default-spacing"} onClick={props.onClick}>
            <label className={props.icon != null ? "icon-spacing" : ''}>{props.name}</label>
            {
                props.icon != null ? props.icon : null
            }
        </button>
    );
}