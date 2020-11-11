import $ from 'jquery';
import {View} from '../common/my_common';

export default class IndexComponent extends View.Component {
    create() {
        return $(`
            <div>
                <h1>Hello World!</h1>
            </div>
        `);
    }
}

