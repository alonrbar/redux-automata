import { ClassInfo } from '../../components/classInfo';
import { Component } from '../../components/component';
import { ComponentInfo } from '../../components/componentInfo';
import { ConnectionInfo } from './connectionInfo';

export class Connect {
    
    public static readonly connectReducer = () => '<connected>';

    public static getConnectionInfo(propHolder: Component | object, propKey: string | symbol): ConnectionInfo {
        if (propHolder instanceof Component) {
            const compInfo = ComponentInfo.getInfo(propHolder);
            return compInfo && compInfo.connectedProps[propKey];
        } else {
            const compInfo = ClassInfo.getInfo(propHolder);
            return compInfo && compInfo.connectedProps[propKey];
        }
    }    
}