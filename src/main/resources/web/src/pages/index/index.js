import IndexComponent from "./index_component";
import $ from 'jquery';

$(function () {
    $(document.body).append(new IndexComponent().create());
});
