const fs = require('fs');

const Handlebars = require('handlebars');
const View = require('../../../../web/View');

class CandyTemplate extends View {
    constructor(context) {
        super(context);

        this.handlebars = Handlebars.create();
    }

    renderFile(file, parameters) {
        fs.readFile(file, 'UTF-8', (err, template) => {
            let compiled = this.handlebars.compile(template);

            this.context.response.end( compiled(parameters) );
        });
    }
}

module.exports = CandyTemplate;
