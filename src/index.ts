import {ILayoutRestorer, JupyterFrontEnd, JupyterFrontEndPlugin} from '@jupyterlab/application';
import {ICommandPalette, MainAreaWidget, WidgetTracker} from '@jupyterlab/apputils';
import {Message} from '@phosphor/messaging';
import {Widget} from '@phosphor/widgets';
import Vue from 'vue';
import Hello from './Hello.vue'


class HelloVue extends Widget {
    /**
     * Construct a new HelloVue widget.
     */
    constructor() {
        super();
    }

    /**
     * Handle update requests for the widget.
     */
    async onUpdateRequest(msg: Message): Promise<void> {
        new Vue({
            el: this.node,
            render: h => h(Hello)
        })
    }
}


/**
 * Activate the HelloVue widget extension.
 */
function activate(app: JupyterFrontEnd, palette: ICommandPalette, restorer: ILayoutRestorer) {
    console.log('JupyterLab extension jupyterlab_vue is activated!');

    // Declare a widget variable
    let widget: MainAreaWidget<HelloVue>;

    // Add an application command
    const command: string = 'vue:open';
    app.commands.addCommand(command, {
        label: 'Hello World Vue.js',
        execute: () => {
            if (!widget) {
                // Create a new widget if one does not exist
                const content = new HelloVue();
                widget = new MainAreaWidget({content});
                widget.id = 'vue-jupyterlab';
                widget.title.label = 'Hello World Vue.js';
                widget.title.closable = true;
            }
            if (!tracker.has(widget)) {
                // Track the state of the widget for later restoration
                tracker.add(widget);
            }
            if (!widget.isAttached) {
                // Attach the widget to the main work area if it's not there
                app.shell.add(widget, 'main');
            }
            widget.content.update();

            // Activate the widget
            app.shell.activateById(widget.id);
        }
    });

    // Add the command to the palette.
    palette.addItem({command, category: 'Hello World Vue.js'});

    // Track and restore the widget state
    let tracker = new WidgetTracker<MainAreaWidget<HelloVue>>({
        namespace: 'vue'
    });
    restorer.restore(tracker, {
        command,
        name: () => 'vue'
    });
}

/**
 * Initialization data for the jupyterlab_vue extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
    id: 'jupyterlab_vue',
    autoStart: true,
    requires: [ICommandPalette, ILayoutRestorer],
    activate: activate
};

export default extension;
