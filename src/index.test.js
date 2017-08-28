import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe('Sample test', () => {
    it('should pass', () => {
        expect(true).to.equal(true);
    });
});

// jsdom@9.8.0 
describe('index.html', () => {
    it('should say Users', (done) => {
        const index = fs.readFileSync('./src/index.html', 'utf-8'); // Loading the files

        jsdom.env(index, function(err, window) { // can specify array of JavaScript files if required by index.html
            const h2 = window.document.getElementsByTagName('h2')[0];

            expect(h2.innerHTML).to.equal('Users');
            done();
            window.close();
        });
    });
});