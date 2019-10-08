module.exports = (sequelize, Sequelize) => {
    const Asset = sequelize.define('assets', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        input_location: {
            type: Sequelize.STRING
        },
        input_interface: {
            type: Sequelize.STRING
        },
        output_location: {
            type: Sequelize.STRING
        },
        output_interface: {
            type: Sequelize.STRING
        },
        output_vid_res: {
            type: Sequelize.STRING
        },
        output_vid_fps: {
            type: Sequelize.INTEGER
        },
        output_vid_codec: {
            type: Sequelize.STRING
        },
        output_vid_bitrate: {
            type: Sequelize.INTEGER
        },
        output_vid_logopath: {
            type: Sequelize.STRING
        },
        output_vid_logo_xaxis: {
            type: Sequelize.INTEGER
        },
        output_vid_logo_yaxis: {
            type: Sequelize.INTEGER
        },
        output_aud_codec: {
            type: Sequelize.STRING
        },
        output_aud_bitrate: {
            type: Sequelize.INTEGER
        },
        output_muxrate: {
            type: Sequelize.INTEGER
        },
        output_sdt_spname: {
            type: Sequelize.STRING
        },
        output_sdt_sname: {
            type: Sequelize.STRING
        },
        output_nix_procid: {
            type: Sequelize.INTEGER
        },
        active: {
            type: Sequelize.STRING
        }
    });
    return Asset;
}