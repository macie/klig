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

    describe('should be able to parse one line', () => {
        it('with one special key', () => {
            const layout = 'SHIFT';
            const ast = [['SHIFT']];

            let result = parser.parse(layout);

            expect(result).toEqual(ast);
        });

        it('with one special key and spaces', () => {
            const layout = '  ALT\t ';
            const ast = [['META']];

            let result = parser.parse(layout);

            expect(result).toEqual(ast);
        });

        it('with one special key and new line', () => {
            const layout = 'ALTGR\r\n';
            const ast = [['ALTGR']];

            let result = parser.parse(layout);

            expect(result).toEqual(ast);
        });

        it('with one special key and spaces and new line', () => {
            const layout = ' ALTGR\t\r\n';
            const ast = [['ALTGR']];

            let result = parser.parse(layout);

            expect(result).toEqual(ast);
        });
    });
});
