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
        describe('with one special key', () => {
            it('without spaces', () => {
                const layout = 'SHIFT';
                const ast = [['SHIFT']];alt

                let result = parser.parse(layout);

                expect(result).toEqual(ast);
            });

            it('with spaces', () => {
                const layout = '  ALT\t ';
                const ast = [['META']];

                let result = parser.parse(layout);

                expect(result).toEqual(ast);
            });

            it('with new line', () => {
                const layout = 'ALTGR\r\n';
                const ast = [['ALTGR']];

                let result = parser.parse(layout);

                expect(result).toEqual(ast);
            });

            it('with spaces and new line', () => {
                const layout = ' ALTGR\t\r\n';
                const ast = [['ALTGR']];

                let result = parser.parse(layout);

                expect(result).toEqual(ast);
            });
        });

        describe('with many special key', () => {
            it('with spaces', () => {
                const layout = 'OPTION  ALT\t ';
                const ast = [['META', 'META']];

                let result = parser.parse(layout);

                expect(result).toEqual(ast);
            });

            it('with new line', () => {
                const layout = ' ALT ALTGR\r\n';
                const ast = [['META', 'ALTGR']];

                let result = parser.parse(layout);

                expect(result).toEqual(ast);
            });

            it('with spaces and new line', () => {
                const layout = '  ALTGR CTRL\t\r\n';
                const ast = [['ALTGR', 'CONTROL']];

                let result = parser.parse(layout);

                expect(result).toEqual(ast);
            });
        });
    });
});
