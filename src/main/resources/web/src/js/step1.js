import Step1Component from "./step1_component";
import $ from 'jquery'
import 'jquery-ui/ui/widgets/dialog'

$(function () {
    $(document.body).append(new Step1Component().create());
    $("#dialog").dialog();
});
