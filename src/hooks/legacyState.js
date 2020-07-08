import { useState } from "react";

export default (initState : Object) => {
    const [state, setState] = useState(initState);
    return [state, (values : Object) => setState({ ...state, ...values })];
}
