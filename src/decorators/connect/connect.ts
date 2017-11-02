import { Component } from '../../components';
import { ClassInfo } from '../../info';

export class Connect {

    public static readonly placeholder = '<connected>';

    public static isConnectedProperty(propHolder: Component | object, propKey: string | symbol): boolean {
        const compInfo = ClassInfo.getInfo(propHolder);
        return compInfo && compInfo.connectedProps[propKey];
    }

    public static setupConnectedProps(target: Component, targetInfo: ClassInfo, source: object, sourceInfo: ClassInfo): void {
        if (!sourceInfo)
            return;

        // trigger connected props (necessary for connected props with initial 'undefined' value)
        for (let propKey of Object.keys(sourceInfo.connectedProps)) {

            // tslint:disable-next-line:no-unused-expression
            (source as any)[propKey];
            var desc = Object.getOwnPropertyDescriptor(source, propKey);
            Object.defineProperty(target, propKey, desc);
        }

        // copy metadata
        targetInfo.connectedProps = sourceInfo.connectedProps;
    }

    /**
     * Returns a shallow clone of 'state' with it's computed props replaced with
     * Connect.placeholder.
     */
    public static removeConnectedProps(state: any, obj: any): any {
        const info = ClassInfo.getInfo(obj);
        if (!info)
            return state;

        const newState = Object.assign({}, state);
        for (let propKey of Object.keys(info.connectedProps)) {
            newState[propKey] = Connect.placeholder;
        }
        return newState;
    }
}