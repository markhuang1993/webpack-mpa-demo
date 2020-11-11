import {View} from "../common/my_common";
import $ from 'jquery'

export default class Step1Component extends View.Component {
    create() {
        return $(`
            <div id="dialog" title="Basic dialog">
              <p>This is the default dialog which is useful for displaying information. The dialog window can be moved, resized and closed with the &apos;x&apos; icon.</p>
            </div>
        `);
    }
}
