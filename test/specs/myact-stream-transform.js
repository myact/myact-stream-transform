var fs = require( 'fs' ),
    JSONStream = require( 'JSONStream' ),
    Transform = require( 'stream' ).Transform,
    expect = require( 'chai' ).expect,
    MyactStreamTransform = require( '../../' );

describe( 'MyactStreamTransform', function() {
    var transform;
    before(function() {
        transform = new MyactStreamTransform();
    });

    it( 'should extend stream Transform', function() {
        expect( transform ).to.be.an.instanceof( Transform );
        expect( transform._transform ).to.be.a( 'function' );
    });

    it( 'should be an ObjectMode Transform', function() {
        expect( transform._writableState.objectMode ).to.be.true;
    });

    it( 'should accept a key property when initialized', function() {
        var key = 'example';

        var transform = new MyactStreamTransform( key );

        expect( transform.keyProperty ).to.equal( key );
    });

    it( 'should default to using ID as a key property if none specified at initialization', function() {
        expect( transform.keyProperty ).to.equal( 'id' );
    });

    it( 'should transform data into a Myact-compatible feed item', function( done ) {
        var path = __dirname + '/../fixtures/data.json',
            data = require( path ),
            fileStream = fs.createReadStream( path, { encoding: 'utf8' });

        fileStream
            .pipe( JSONStream.parse() )
            .pipe( transform )
            .on( 'data', function( item ) {
                expect( item ).to.be.an( 'object' );
                expect( item.key ).to.equal( data.id );
                expect( item.data ).to.eql( data );

                done();
            });
    });
});