import { assertComponentSchema } from './componentSchema';
import { getConstructorProp } from './utils';

declare var require: any;
var snakecase = require('lodash.snakecase');

//
// schema options
//

export const COMPONENT_SCHEMA_OPTIONS = Symbol('COMPONENT_SCHEMA_OPTIONS');

export class SchemaOptions {
    /**
     * Add the class name of the object that holds the action to the action name.
     * Format: <class name>.<action name>
     */
    public actionNamespace? = true;
    /**
     * Use redux style action names. For instance, if a componentSchema defines a
     * method called 'incrementCounter' the matching action name will be
     * 'INCREMENT_COUNTER'.
     */
    public uppercaseActions? = true;
    /**
     * By default each component is assigned (with some optimizations) with it's
     * relevant sub state on each store change. Set this to false to disable
     * this updating process. The store's state will still be updated as usual
     * and can always be retrieved using store.getState().
     */
    public updateState? = true;
}

export function getSchemaOptions(schema: any): SchemaOptions {
    assertComponentSchema(schema);
    return Object.assign({}, new SchemaOptions(), globalOptions.schema,  getConstructorProp(schema, COMPONENT_SCHEMA_OPTIONS));
}

export function getActionName(key: string, schema: any): string {
    var options = getSchemaOptions(schema);

    var actionName = key;
    var actionNamespace = schema.constructor.name;

    if (options.uppercaseActions) {
        actionName = snakecase(actionName).toUpperCase();
        actionNamespace = snakecase(actionNamespace).toUpperCase();
    }

    if (options.actionNamespace) {
        actionName = actionNamespace + '.' + actionName;
    }

    return actionName;
}

//
// global options
//

export enum LogLevel {
    /**
     * Emit no logs
     */
    None = 0,
    Verbose = 1,    
    Debug = 2,
    /**
     * Emit no logs (same as None)
     */
    Silent = 10
}

export class GlobalOptions {
    public logLevel = LogLevel.Silent;
    public schema = new SchemaOptions();
}

export const globalOptions = new GlobalOptions();