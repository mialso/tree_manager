declare namespace JSX {
    interface IntrinsicElements {
        "plugin": any;
        "service": any;
        "module": any;
        "control-state": any;
        "snapshot": { name: string; byId: boolean; onData: any, children: any };
        "stream": { stream: any; children: any };
        "field": any;
        "model": any;
        "message": any;
    }
}
