describe('Klig parser', () => {
    let parser;

    beforeEach(() => {
        parser = {parse: jest.fn(() => undefined)};
    });

    describe('should be able to parse empty layout', () => {
        it('without any characters', () => {
            const layout = '';
            const ast = [[]];

            let result = parser.parse(layout);

            expect(result).toEqual(ast);
        });

        it('with spaces in one line', () => {
            const layout = '  \t ';
            const ast = [[]];

            let result = parser.parse(layout);

            expect(result).toEqual(ast);
        });

        it('with many empty lines', () => {
            const layout = '\n\r\n\n';
            const ast = [[], []];

            let result = parser.parse(layout);

            expect(result).toEqual(ast);
        });

        it('with many lines with spaces', () => {
            const layout = '\n  \r\n\t';
            const ast = [[], [], []];

            let result = parser.parse(layout);

            expect(result).toEqual(ast);
        });
    });
});
