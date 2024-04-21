declare namespace JSX {
  interface IntrinsicElements {
    "plugin": any;
    "service": any;
    "module": any;
    "control-state": any;
    "snapshot": { name: string; byId: boolean; children: any };
    "stream": any;
    "field": any;
    "model": any;
    "message": any;
  }
}
