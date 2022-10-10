
class StepState{
    constructor(is_hidden) {
        this.is_hidden = is_hidden;
        this.data = null;
    }
}

class Step {
    constructor(id, next_steps, controls) {
        this.id = id;
        this.next_steps = next_steps
        this.controls = controls
        this.initial_state = null;
        this.current_state = null;
    }

    init() {

    }

    exit() {

    }

    get_next_id() {
        if (this.next_steps.length === 1) {
            return this.next_steps[0];
        } else {
            let element_id = this.id + "-" + this.controls[0];
            return document.getElementById(element_id).value;
        }
    }

    display() {
        if (this.controls[0] === "modal") {
            document.getElementById(this.id + "-modal-button").click();
        } else {
            let div_element = document.getElementById(this.id + "-div");
            div_element.classList.remove("visually-hidden");
        }
    }


    validate() {
        // Check mandatory values
    }

}

class StepForm {
    constructor(previous_button, next_button) {
        this.previous_button = previous_button;
        this.next_button = next_button;
        this.steps = {};
        this.current_step = null;
    }

    addStep(id, next_steps, controls) {
        this.steps[id] = new Step(id, next_steps, controls);
    }

    init() {
        this.addStep("step-one", ["step-two"], ["select"]);
        this.addStep("step-two", ["step-three", "step-four"], ["select"]);
        this.addStep("step-three", ["step-nine"], ["text"]);
        this.addStep("step-four", ["step-five"], ["text"]);
        this.addStep("step-five", ["step-six"], ["text"]);
        this.addStep("step-six", ["step-seven", "step-eight"], ["select"]);
        this.addStep("step-seven", ["step-eight"], ["text"]);
        this.addStep("step-eight", ["step-eight-a"], ["text"]);
        this.addStep("step-eight-a", ["step-nine", "step-twelve"], ["modal"]);
        this.addStep("step-nine", ["step-ten"], ["select"]);
        this.addStep("step-ten", ["step-eleven", "step-twelve"], ["select", "text"]);
        this.addStep("step-eleven", ["step-twelve"], ["select"]);
        this.addStep("step-twelve", [""], [""]);

        this.current_step = this.steps["step-one"];
    }

    next() {
        this.current_step.exit()
        let step_id = this.current_step.get_next_id();
        console.log(step_id);
        let step = this.steps[step_id];
        this.current_step = step;
        this.current_step.display();
    }

}

let ccform = new StepForm("", "button-next-step");
document.addEventListener("DOMContentLoaded", function(event){
    ccform.init();
    document.getElementById("button-next-step").addEventListener("click", function(event){
        ccform.next();
    });
    document.getElementById("step-eight-a-continue").addEventListener("click", function(event){
       document.getElementById("step-eight-a-modal").value = "step-nine";
       ccform.next();
    });
    document.getElementById("step-eight-a-finish").addEventListener("click", function(event){
       document.getElementById("step-eight-a-modal").value = "step-twelve";
       ccform.next();
    });
});