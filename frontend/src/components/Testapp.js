import React from 'react'
import { useRef, useCallback, useState, useEffect } from 'react'
import * as THREE from '../../public/threejs/node_modules/three/build/three.module.js';
import MyVerticallyCenteredModal from './PopupWindow'
import Dataplot from './Plot'

const Testapp = (props) => {
    const mainVisRef = useRef(null);
    let ifblock = false;
    let ifhidecusor = true;
    const [traction, changetraction] = useState(null);
    const [aflow, changeaflow] = useState(null);
    const [modulenum, changemodulenum] = useState(null);
    const [time, changetime] = useState(null);


    useEffect(() => {
        const data = [[[-0.65405, -5.4455, 4.81199, -9.47793, -4.58527, -7.24287, -14.1561, -22.7497, -18.8035, -19.3252, -24.4961, -29.9846, -33.3568, -27.6882, -36.0315, -30.3713, -33.097, -32.1799, -14.6804, -9.57726, -5.84966, -2.61763, -1.20317, 12.9288, 10.0066, -0.996357, -6.2117, -9.42012, -5.87843, -4.47215, -5.3927], [24.6916, 35.9487, 28.3653, 27.495, 28.6708, 43.7567, 33.1208, 27.0152, 32.295, 36.8249, 40.5814, 42.4626, 37.4054, 39.3642, 40.6073, 44.2106, 44.5029, 56.47, 60.5786, 54.2503, 53.3618, 54.8026, 52.365, 46.9983, 50.0901, 47.5601, 46.7568, 59.0532, 57.3696, 63.779, 70.1511], [60.0, 70.0, 80.0, 90.0, 100.0, 110.0, 120.0, 130.0, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 210.0, 220.0, 230.0, 240.0, 250.0, 260.0, 270.0, 280.0, 290.0, 300.0, 310.0, 320.0, 330.0, 340.0, 350.0, 360.0]], [[1.42629, -5.13512, -8.70829, -12.9582, -1.40774, -2.02142, 1.05104, 15.0841, 16.7141, 11.8323, 11.0014, 5.92359, 5.81377, 8.54742, 7.70339, 8.45982, 11.5299, 1.10334, 2.72782, -0.0800937, 1.84717, -5.15599, -8.66915, -11.7779, -1.06097, -4.74911, -8.41262, -6.70103, -12.1659, 0.176578, -13.4019], [-18.153, -20.1944, -29.9655, -32.8134, -39.9116, -38.4688, -37.1127, -32.4065, -34.9108, -39.1695, -35.9049, -30.491, -26.4651, -22.0672, -19.1091, -23.4073, -19.6178, -20.992, -24.0905, -37.226, -39.8815, -44.9106, -47.877, -49.6462, -45.4401, -56.7801, -52.3217, -47.9469, -40.462, -46.4755, -38.5348], [60.0, 70.0, 80.0, 90.0, 100.0, 110.0, 120.0, 130.0, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 210.0, 220.0, 230.0, 240.0, 250.0, 260.0, 270.0, 280.0, 290.0, 300.0, 310.0, 320.0, 330.0, 340.0, 350.0, 360.0]], [[-0.176713, 22.5521, 26.177, 23.3504, 14.2528, 25.9131, 23.8969, 21.2091, 13.5219, 14.9452, 15.5318, 10.9974, 4.13448, 1.97304, -2.92138, -7.42048, -12.3248, -2.92694, 0.566979, 4.87909, 8.10563, 9.66767, 3.59228, 5.29425, 7.61646, 6.89867, 8.71672, 2.56114, 4.50492, 6.72163, 17.0938], [-7.20456, -4.02104, -6.08036, -11.2484, -27.1131, -1.74552, -0.343368, 0.836236, -7.96136, -9.6273, -13.3326, -14.8183, -20.8169, -20.5524, -22.0702, -18.7803, -8.62191, -7.62558, -8.2781, -11.0202, -12.7342, -2.6651, 8.58464, 3.70637, 6.29466, 6.28657, 8.33978, 7.62496, -1.75762, 0.0395509, 1.61344], [60.0, 70.0, 80.0, 90.0, 100.0, 110.0, 120.0, 130.0, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 210.0, 220.0, 230.0, 240.0, 250.0, 260.0, 270.0, 280.0, 290.0, 300.0, 310.0, 320.0, 330.0, 340.0, 350.0, 360.0]], [[2.07837, 2.12999, 0.998701, -0.513217, 5.36493, 4.84708, 3.13006, 2.22106, 1.59313, 0.281159, 2.003, -2.62328, -4.9216, -3.58812, -3.82641, -7.56926, -2.07932, -3.15868, 1.27332, 0.0685934, -1.99705, -0.906195, 3.75773, 2.07567, 2.0669, 1.94987, 5.39977, 17.9483, 9.10299, 13.1041, 3.29348], [-6.55268, -13.2643, -16.7532, -16.1104, -19.7665, -19.6948, -21.7877, -22.4707, -12.3178, -15.5726, -17.2777, -18.9345, -23.1316, -24.4578, -24.5323, -19.1212, -16.579, -18.6562, -19.7611, -16.4799, -17.327, -16.9333, -18.9118, -20.3372, -18.9161, -17.4257, -13.5697, -5.4999, -8.74239, -10.0763, -13.9317], [60.0, 70.0, 80.0, 90.0, 100.0, 110.0, 120.0, 130.0, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 210.0, 220.0, 230.0, 240.0, 250.0, 260.0, 270.0, 280.0, 290.0, 300.0, 310.0, 320.0, 330.0, 340.0, 350.0, 360.0]], [[6.82834, 6.78627, 6.75326, 6.72276, 19.6869, 6.14199, 9.48928, 4.31968, 3.96386, -4.71494, -12.4881, -14.7901, -31.6586, -29.3468, -29.7074, -29.7538, -29.8792, -30.0011, -30.2563, -30.4151, -29.6076, -29.5191, -29.4304, -29.3557, -29.2955, -32.1095, -28.792, -27.4868, -28.3128, -28.2276, -23.6863], [-13.2732, -13.4807, -13.6434, -13.7939, -17.3684, -27.0645, -9.37922, -3.53779, -1.58791, -3.46944, 3.64416, 5.27603, 4.49381, 7.4748, 4.23205, 4.21853, 4.18203, 4.14654, 4.07226, 4.02603, 2.11201, 2.13559, 2.15921, 2.17913, 2.19517, -9.73719, -8.88528, -11.1144, -11.3953, -11.9623, -13.7224], [60.0, 70.0, 80.0, 90.0, 100.0, 110.0, 120.0, 130.0, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 210.0, 220.0, 230.0, 240.0, 250.0, 260.0, 270.0, 280.0, 290.0, 300.0, 310.0, 320.0, 330.0, 340.0, 350.0, 360.0]], [[-1.92867, -2.05396, -2.1438, -2.2042, -2.24615, -2.28099, -2.30983, -2.33207, -2.35226, -2.36602, -2.37713, -2.38875, -2.39792, -2.40613, -2.41404, -2.42033, -2.42614, -2.43222, -2.43612, -2.43995, -2.44343, -2.44716, -2.45055, -2.45383, -2.45677, -2.45894, -2.46153, -2.46381, -2.46501, -2.46683, -2.46935], [1.00807, 1.06432, 1.12009, 1.16743, 1.20753, 1.24444, 1.27976, 1.31004, 1.33821, 1.36058, 1.38232, 1.39982, 1.41659, 1.43208, 1.44803, 1.46438, 1.47648, 1.48838, 1.50005, 1.50959, 1.51943, 1.52757, 1.5364, 1.54559, 1.55204, 1.55988, 1.56646, 1.57285, 1.57951, 1.58598, 1.58957], [60.0, 70.0, 80.0, 90.0, 100.0, 110.0, 120.0, 130.0, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 210.0, 220.0, 230.0, 240.0, 250.0, 260.0, 270.0, 280.0, 290.0, 300.0, 310.0, 320.0, 330.0, 340.0, 350.0, 360.0]], [[-0.245401, -0.641561, -1.46352, -1.0501, -0.779731, -0.704754, -1.08338, -0.712678, -1.85103, -1.03461, -1.17105, -0.750002, 0.0384128, -1.10415, -1.35463, -1.00376, -0.37093, -1.23454, -0.964511, -0.0246406, -1.04446, -0.581424, -0.647838, -1.11896, -0.990451, -0.712994, -1.062, -0.837715, -0.249813, -1.07873, -1.01811], [-3.92709, -3.94448, -4.07558, -4.14958, -5.93057, -4.90809, -4.68886, -5.11037, -4.87855, -5.7034, -2.88337, -3.86004, -3.25281, -5.24782, -4.77868, -5.9076, -2.9987, -4.21059, -4.08273, -4.92357, -2.96172, -4.45131, -3.87295, -5.40387, -5.28109, -4.11442, -3.94306, -4.5412, -3.33748, -5.63914, -3.86435], [60.0, 70.0, 80.0, 90.0, 100.0, 110.0, 120.0, 130.0, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 210.0, 220.0, 230.0, 240.0, 250.0, 260.0, 270.0, 280.0, 290.0, 300.0, 310.0, 320.0, 330.0, 340.0, 350.0, 360.0]], [[-0.380902, -6.17302, -5.44442, -5.1682, -13.0276, -14.7799, -15.5682, -18.0749, -23.9882, -18.6759, -20.963, -20.1108, -23.6305, -23.9451, -23.9453, -16.9779, -22.7939, -23.411, -26.6563, -24.3162, -27.0971, -29.4695, -32.0904, -35.7402, -38.6839, -37.1748, -40.564, -42.0701, -41.3058, -38.8051, -40.8551], [1.38241, -2.37733, -2.16671, 4.08945, 0.740036, 0.566461, -3.20402, 2.47641, 7.92989, 6.34176, 9.56279, 0.354836, -2.50031, -2.29631, -2.1315, 0.147056, -1.28715, 1.06546, 3.04414, 7.03452, 1.21069, 3.922, 1.8282, 2.80352, 5.62602, 5.93625, 6.28939, 5.87549, 8.26263, 9.83955, 11.3632], [60.0, 70.0, 80.0, 90.0, 100.0, 110.0, 120.0, 130.0, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 210.0, 220.0, 230.0, 240.0, 250.0, 260.0, 270.0, 280.0, 290.0, 300.0, 310.0, 320.0, 330.0, 340.0, 350.0, 360.0]], [[11.124, 29.2688, 46.0927, -11.1668, -44.182, -71.8718, -84.8568, -99.2065, -123.171, -123.758, -120.479, -122.729, -109.735, -97.2149, -95.4743, -98.9841, -92.5273, -95.2026, -92.1638, -84.2581, -80.5538, -77.1363, -80.1572, -94.7109, -108.035, -102.527, -120.082, -131.499, -124.573, -126.274, -125.564], [21.7568, 35.6568, 36.7604, 50.488, 51.0915, 56.9652, 75.6069, 82.9605, 89.5536, 90.4701, 105.561, 114.79, 114.366, 103.316, 126.697, 127.697, 114.309, 119.232, 102.214, 61.0868, 41.8166, 38.7579, 36.7262, 43.5693, 44.1249, 35.8527, 32.7152, 22.9715, 38.3543, 43.9848, 46.3726], [60.0, 70.0, 80.0, 90.0, 100.0, 110.0, 120.0, 130.0, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 210.0, 220.0, 230.0, 240.0, 250.0, 260.0, 270.0, 280.0, 290.0, 300.0, 310.0, 320.0, 330.0, 340.0, 350.0, 360.0]], [[1.35072, -1.01594, -2.34057, -2.07258, -2.77394, -4.2256, -4.26008, -4.04061, -6.25768, -4.00351, -3.12513, -0.112468, -1.36248, -1.86561, -0.470919, -1.79723, -1.37452, -1.22524, -3.35079, -5.69593, -5.85069, -6.43051, -6.50039, -5.81035, -5.18488, -9.46419, -9.42657, -11.9626, -14.6905, -14.7717, -13.9836], [-2.34417, -2.96304, -2.64743, -7.0687, -13.0087, -8.16264, -8.56019, -8.57082, -30.5899, -32.839, -33.9355, -33.2128, -34.3032, -40.2511, -41.5317, -41.5573, -42.0117, -41.4322, -42.9943, -41.3464, -38.283, -42.1081, -41.7383, -41.2829, -40.0882, -38.6059, -38.5987, -41.8689, -44.1257, -32.5154, -26.535], [60.0, 70.0, 80.0, 90.0, 100.0, 110.0, 120.0, 130.0, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 210.0, 220.0, 230.0, 240.0, 250.0, 260.0, 270.0, 280.0, 290.0, 300.0, 310.0, 320.0, 330.0, 340.0, 350.0, 360.0]], [[-10.8935, -9.15412, -10.6785, -10.2828, -9.14967, -8.84994, -6.9752, -12.7136, -9.08171, -11.8178, -12.879, -15.532, -14.4287, -15.4361, -15.2245, -13.9806, -11.0566, -11.2045, -13.1406, -12.0586, -12.8248, -11.1631, -11.8271, -7.56817, -4.05595, 0.304065, -4.5704, -5.55852, -6.92526, 2.09692, 3.52285], [3.90074, 9.62712, 8.02787, 8.6321, 2.49288, 1.98541, 3.54208, -1.00036, 1.60116, 2.72828, 7.06379, 4.19829, 0.761369, -4.79059, -4.64492, -6.89743, -4.07181, -7.64169, -1.57266, 1.97264, 6.40213, 8.94946, 10.9685, 6.07183, 13.2911, 16.6552, 17.6015, 19.377, 4.28789, -0.514216, -0.247923], [60.0, 70.0, 80.0, 90.0, 100.0, 110.0, 120.0, 130.0, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 210.0, 220.0, 230.0, 240.0, 250.0, 260.0, 270.0, 280.0, 290.0, 300.0, 310.0, 320.0, 330.0, 340.0, 350.0, 360.0]], [[-4.11807, -10.0257, -2.96277, -11.655, -11.7089, -11.6977, -11.6344, -11.6329, -11.6209, -14.227, -4.41019, -3.66445, -3.62239, -3.66358, -3.84329, -3.99436, -4.08225, -9.93486, -12.5162, -22.2665, -27.4622, -26.2508, -31.0998, -29.35, -12.3623, 2.06221, 13.993, 18.7036, 16.208, 5.59938, -7.67535], [-40.0409, -32.9505, -27.4368, -37.28, -37.2284, -37.2391, -37.2997, -37.3011, -37.3126, -40.6609, -61.7949, -62.6586, -62.7301, -62.6729, -62.3673, -62.1103, -61.9608, -51.8822, -50.6863, -60.607, -60.0213, -60.2649, -65.3363, -58.7897, -80.4004, -89.2925, -90.6885, -94.1664, -96.4194, -93.4467, -100.02], [60.0, 70.0, 80.0, 90.0, 100.0, 110.0, 120.0, 130.0, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 210.0, 220.0, 230.0, 240.0, 250.0, 260.0, 270.0, 280.0, 290.0, 300.0, 310.0, 320.0, 330.0, 340.0, 350.0, 360.0]], [[-6.989, -7.36443, -10.1987, -13.786, -15.7163, -16.7875, -19.5204, -20.3674, -26.7078, -26.2496, -29.5371, -32.7407, -30.1649, -34.2047, -28.1187, -24.6472, -32.7588, -44.0284, -39.7679, -37.4319, -41.4303, -44.7626, -42.8788, -42.6848, -42.8174, -39.1512, -48.4864, -46.0756, -53.2618, -52.4287, -53.8388], [-12.8, -14.0794, -20.8327, -21.4998, -14.8693, -14.3138, -12.2924, -7.26593, -9.81891, -8.98263, -14.8098, -20.4519, -14.9771, -19.1995, -19.8863, -17.4123, -24.0685, -20.3481, -27.3296, -22.0689, -23.1493, -27.9977, -29.0593, -26.183, -25.4117, -29.4793, -33.7106, -28.6109, -30.9935, -36.239, -29.6341], [60.0, 70.0, 80.0, 90.0, 100.0, 110.0, 120.0, 130.0, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 210.0, 220.0, 230.0, 240.0, 250.0, 260.0, 270.0, 280.0, 290.0, 300.0, 310.0, 320.0, 330.0, 340.0, 350.0, 360.0]], [[0.831506, 7.0698, 7.21981, 2.87374, -11.2042, -6.76107, -0.174073, 4.6293, 8.31754, 7.91491, 13.1614, 4.36114, -0.987973, 0.128035, -7.8126, -10.6237, -10.1718, -8.39789, -3.91089, -8.23431, -12.8493, -32.7574, -15.8509, -18.6404, -20.0662, -24.5221, -22.6678, -16.6248, -19.8158, -15.9069, -9.96069], [52.3986, 54.5134, 41.0792, 40.0845, 45.1458, 45.741, 50.8833, 42.5511, 45.559, 60.0507, 87.2094, 73.119, 80.6363, 83.6833, 90.161, 94.7009, 100.603, 95.4396, 110.101, 97.3428, 89.8605, 85.923, 80.7041, 80.963, 85.616, 87.3381, 87.1857, 73.1181, 68.3778, 61.6116, 63.8633], [60.0, 70.0, 80.0, 90.0, 100.0, 110.0, 120.0, 130.0, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 210.0, 220.0, 230.0, 240.0, 250.0, 260.0, 270.0, 280.0, 290.0, 300.0, 310.0, 320.0, 330.0, 340.0, 350.0, 360.0]], [[-3.71827, -5.76508, -10.1352, -10.8047, -1.96235, -3.27081, -3.58246, -9.21414, -7.27807, -3.64057, -3.32267, 1.60549, -0.980222, -4.23941, -2.39276, 0.557552, 0.345112, -1.00781, 3.92603, -3.18198, 2.86083, 0.181552, -6.33625, -14.0292, -12.1006, -5.41838, -8.55252, -8.48364, -5.90892, -9.82404, -10.3051], [-4.72912, -2.2026, -5.46314, -13.2245, -10.8325, -6.78664, -5.89806, 0.0532987, 0.51705, 2.03986, 1.61235, -2.43125, -8.21052, -3.86222, -1.73041, -9.07365, 2.70957, 1.12654, 4.63464, 9.1225, 7.46688, 8.3094, 5.66105, 9.20415, 8.39196, 12.5783, 10.4996, 7.5919, 7.59463, 9.85432, 7.74288], [60.0, 70.0, 80.0, 90.0, 100.0, 110.0, 120.0, 130.0, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 210.0, 220.0, 230.0, 240.0, 250.0, 260.0, 270.0, 280.0, 290.0, 300.0, 310.0, 320.0, 330.0, 340.0, 350.0, 360.0]], [[27.7022, 26.3397, 23.5418, 27.2372, 29.7009, 35.0834, 38.4004, 41.7275, 43.6861, 42.6906, 44.6448, 51.0513, 54.0491, 62.592, 69.0415, 66.4511, 61.4154, 56.2043, 52.6597, 46.2083, 49.63, 56.5289, 55.1008, 59.8023, 59.3393, 63.5437, 69.5626, 74.9821, 81.1271, 85.8607, 92.6466], [2.49166, 3.67289, 1.46872, -3.19235, -6.46732, -8.11491, -5.12599, -7.39784, -12.5886, -18.4514, -21.0124, -19.2503, -12.9526, -16.0743, -12.8742, -13.7493, -9.61595, -9.21535, -16.215, -11.9121, -8.57908, -7.7653, -11.0787, -6.10904, -4.26419, -4.24508, -6.6148, -6.01028, 0.588947, 4.35738, 4.40324], [60.0, 70.0, 80.0, 90.0, 100.0, 110.0, 120.0, 130.0, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 210.0, 220.0, 230.0, 240.0, 250.0, 260.0, 270.0, 280.0, 290.0, 300.0, 310.0, 320.0, 330.0, 340.0, 350.0, 360.0]], [[-41.5431, -35.2462, -38.5706, -39.9602, -40.3305, -44.7397, -39.7658, -46.7921, -53.3905, -53.7511, -42.3978, -47.716, -38.4313, -25.3261, -23.366, -24.1665, -28.1718, -20.0927, -22.9633, -25.0744, -29.4232, -33.1587, -28.4731, -19.1117, -30.1751, -28.1194, -27.6766, -45.0174, -45.4766, -50.0046, -43.3462], [22.6222, 20.9421, 21.8434, 16.485, 12.4225, 25.609, 24.8844, 27.3637, 24.5234, 23.9919, 22.5148, 23.3802, 24.1403, 16.1169, 21.4349, 19.5162, 28.8597, 29.1421, 27.5243, 33.4864, 31.7619, 21.0561, 23.5949, 23.0182, 15.4254, 16.6266, 16.9876, 14.2692, 18.9345, 0.896278, -3.04162], [60.0, 70.0, 80.0, 90.0, 100.0, 110.0, 120.0, 130.0, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 210.0, 220.0, 230.0, 240.0, 250.0, 260.0, 270.0, 280.0, 290.0, 300.0, 310.0, 320.0, 330.0, 340.0, 350.0, 360.0]], [[-0.376558, -0.400357, -0.419378, -0.432283, -0.442171, -0.44875, -0.457018, -0.46006, -0.464415, -0.462174, -0.474514, -0.467819, -0.471391, -0.471226, -0.468061, -0.473005, -0.472547, -0.472244, -0.478126, -0.473228, -0.474912, -0.47134, -0.479086, -0.475247, -0.475884, -0.474604, -0.478443, -0.474561, -0.474667, -0.473099, -0.475995], [4.63725, 4.73222, 4.80123, 4.85344, 4.88949, 4.91696, 4.94012, 4.95681, 4.96845, 4.98006, 4.9874, 4.99587, 5.00125, 5.00611, 5.00981, 5.01115, 5.01375, 5.01577, 5.01661, 5.01797, 5.01803, 5.01989, 5.019, 5.02065, 5.02041, 5.02063, 5.01996, 5.02117, 5.02088, 5.02223, 5.02113], [60.0, 70.0, 80.0, 90.0, 100.0, 110.0, 120.0, 130.0, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 210.0, 220.0, 230.0, 240.0, 250.0, 260.0, 270.0, 280.0, 290.0, 300.0, 310.0, 320.0, 330.0, 340.0, 350.0, 360.0]], [[-5.45437, -12.5515, -13.311, -20.3855, -15.7223, -29.9892, -28.4163, -25.0327, -21.6595, -22.2402, -28.3988, -25.4219, -32.784, -31.0918, -25.1595, -19.3784, -14.0946, -13.1275, -15.7336, -17.1062, -8.64542, -7.12033, -15.9997, -24.3287, -31.963, -38.9852, -34.958, -33.1737, -34.08, -34.9015, -29.4313], [-9.46634, -14.6081, -16.9292, -12.6491, -11.6732, -14.7142, -20.1881, -16.2157, -20.3102, -24.2873, -20.0601, -21.5654, -15.9004, -15.9199, -13.5869, -7.34249, -5.1952, -0.65831, 9.75043, 7.3191, 8.52614, 5.0103, 0.63412, -3.70658, 3.14786, 3.45983, 2.38053, 3.87891, -0.711442, -1.79298, 2.42629], [60.0, 70.0, 80.0, 90.0, 100.0, 110.0, 120.0, 130.0, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 210.0, 220.0, 230.0, 240.0, 250.0, 260.0, 270.0, 280.0, 290.0, 300.0, 310.0, 320.0, 330.0, 340.0, 350.0, 360.0]], [[4.7562, -0.344447, 3.26964, 0.939149, -0.395369, -1.15264, -3.36142, -1.75566, -0.78917, -8.10847, -16.6665, -18.7921, -10.7636, -3.99791, -5.07511, 0.6154, -8.34474, -3.53127, -2.48444, -2.39538, -2.33294, -12.4113, -13.207, -12.4341, -13.9485, -16.7507, -16.0977, -15.2991, -18.3879, -11.9817, -3.00234], [-0.945832, -5.32201, -1.63386, 3.94528, 13.1081, 15.4726, 21.4596, 17.3995, 16.888, 26.6377, 29.8762, 31.3013, 29.0562, 40.7554, 38.9894, 63.5785, 78.5881, 75.2431, 69.4951, 68.6358, 68.0334, 66.103, 65.1394, 65.0737, 53.4582, 46.1498, 45.2109, 37.6979, 22.5426, 27.3868, 32.5016], [60.0, 70.0, 80.0, 90.0, 100.0, 110.0, 120.0, 130.0, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 210.0, 220.0, 230.0, 240.0, 250.0, 260.0, 270.0, 280.0, 290.0, 300.0, 310.0, 320.0, 330.0, 340.0, 350.0, 360.0]]]
        /*
        import { OrbitControls } from './threejs/node_modules/three/examples/jsm/controls/OrbitControls.js';*/
        let spheresIndex = 0;
        let api_set = new Set();
        let curveid;
        var vec = new THREE.Vector3();
        var pos = new THREE.Vector3();
        let curveobjects;
        let clock, camera, scene, raycaster, renderer, parentTransform, sphereInter;
        let tempcurveobjects = new THREE.Object3D();
        let smallcurveobjects = new THREE.Object3D();
        let selectedcurve = false;
        const spheres = [];
        const mouse = new THREE.Vector2();
        const radius = 100;
        let theta = 0;
        let toggle = 0;
        let controls;
        const mainVis = mainVisRef.current;
        init();
        animate();

        document.body.style.cursor = "none";
        document.addEventListener("keydown", onDocumentKeyDown);
        function onDocumentKeyDown(event){
            event.preventDefault();
            if(event.which == 27){
                ifblock = !ifblock;
                ifhidecusor = !ifhidecusor;
                if(ifhidecusor){
                    document.body.style.cursor = "none";
                } else {
                    document.body.style.cursor = "default";
                }
        }
    }



        function init() {


            const info = document.createElement( 'div' );
            info.style.position = 'absolute';
            info.style.top = '10px';
            info.style.width = '100%';
            info.style.textAlign = 'center';
            

            camera = new THREE.PerspectiveCamera( 70, mainVis.clientWidth/mainVis.clientHeight, 1, 10000 );
            camera.position.set( 0, 200, 300);
            scene = new THREE.Scene();
            clock = new THREE.Clock();
            scene.background = new THREE.Color( 0xFFFFFF );

            const geometry = new THREE.SphereGeometry( 2 );
            const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

            sphereInter = new THREE.Mesh( geometry, material );
            sphereInter.visible = false;
            scene.add( sphereInter );

            const curves = [];
            curveobjects = new THREE.Object3D();
            for (let j = 0; j < 20; j++) {
                curves.push([])
                for ( let i = 0; i < data[0][0].length; i ++ ) {
                    const direction = new THREE.Vector3();
                    const point = new THREE.Vector3();
                    direction.x = data[j][0][i];
                    direction.z = data[j][1][i];
                    direction.y = data[j][2][i];
                    point.add(direction);
                    curves[j].push(point.x, point.y, point.z);
                }
                let lineGeometry = new THREE.BufferGeometry();
                lineGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( curves[j], 3 ) );
                let lineMaterial = new THREE.LineBasicMaterial( { color: Math.random() * 0xffffff , opacity: 1, transparent: true} );
                const object = new THREE.Line( lineGeometry, lineMaterial );
                object.name = j
                curveobjects.add( object );
            }
            scene.add(curveobjects)

            raycaster = new THREE.Raycaster();
            raycaster.params.Line.threshold = 3;
            
            const sphereGeometry = new THREE.SphereGeometry( 3, 32, 32 );
            const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xff00ff } );

            for ( let i = 0; i < 40; i ++ ) {

                const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
                scene.add( sphere );
                spheres.push( sphere );

            }

            renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( mainVis.clientWidth, mainVis.clientHeight );
            mainVis.appendChild( renderer.domElement );

            window.addEventListener( 'mousemove', onDocumentMouseMove );
            window.addEventListener( 'mousedown', onDocumentMouseDown );
            window.addEventListener( 'resize', onWindowResize );
            /*
            controls = new OrbitControls( camera, renderer.domElement );
            controls.update();
            */
        }

        function onWindowResize() {

            camera.aspect = mainVis.clientWidth/mainVis.clientHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( mainVis.clientWidth, mainVis.clientHeight );

        }

        function processdata(inputdata){
            //console.log(inputdata['results'][0][0])
            for (let curvecount = 0; curvecount < inputdata['results'].length; curvecount++) {
                let startp = inputdata['results'][curvecount][0]
                let endp = inputdata['results'][curvecount][1]
                let tempcurves = []
                for (let i = startp+1; i <= endp; i++){
                    tempcurves.push([])
                    for (let j = 0; j < 2; j++){
                        const direction = new THREE.Vector3();
                        const point = new THREE.Vector3();
                        direction.x = data[curvecount][0][i-j];
                        direction.z = data[curvecount][1][i-j];
                        direction.y = data[curvecount][2][i-j];
                        point.add(direction);
                        tempcurves[i-1-startp].push(point.x, point.y, point.z);
                    }
                    let tlineGeometry = new THREE.BufferGeometry();
                    tlineGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( tempcurves[i-1-startp], 3 ) );
                    let tlineMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 , opacity: 1, transparent: true} );
                    const tobject = new THREE.Line( tlineGeometry, tlineMaterial );
                    smallcurveobjects.add( tobject );
                }
            }
            scene.add(smallcurveobjects);
        }

        function onDocumentMouseMove( event ) {

            event.preventDefault();

            mouse.x = ( event.clientX / mainVis.clientWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / mainVis.clientHeight ) * 2 + 1;
            

        }
        
        function onDocumentMouseDown( event ) {
            event.preventDefault();
            /*
            controls.enabled = false
            */
           if (!ifblock){
            mouse.set( ( event.clientX / mainVis.clientWidth ) * 2 - 1, - ( event.clientY / mainVis.clientHeight ) * 2 + 1 );

            raycaster.setFromCamera( mouse, camera );

            const intersects = raycaster.intersectObjects( curveobjects.children );
            const intersects2 = raycaster.intersectObjects( tempcurveobjects.children );
            if (selectedcurve == false){
                if ( intersects.length > 0 ) {
                    let num_of_datapoints = data[intersects[0].object.name][0].length;
                    for (let i = 0; i < 20; i++){
                        curveobjects.children[i].material.opacity = 0.22;
                    }
                    const intersect = intersects[ 0 ];
                    intersect.object.material.opacity = 1;
                    render();
                    let tempcurves = [];
                    for (let i = 1; i < num_of_datapoints; i++){
                        tempcurves.push([])
                        for (let j = 0; j < 2; j++){
                            const direction = new THREE.Vector3();
                            const point = new THREE.Vector3();
                            direction.x = data[intersect.object.name][0][i-j];
                            direction.z = data[intersect.object.name][1][i-j];
                            direction.y = data[intersect.object.name][2][i-j];
                            point.add(direction);
                            tempcurves[i-1].push(point.x, point.y, point.z);
                        }
                        let tlineGeometry = new THREE.BufferGeometry();
                        tlineGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( tempcurves[i-1], 3 ) );
                        let tlineMaterial = new THREE.LineBasicMaterial( { color: Math.random() * 0xffffff , opacity: 1, transparent: true} );
                        const tobject = new THREE.Line( tlineGeometry, tlineMaterial );
                        tobject.name = String((i-1));
                        tempcurveobjects.add( tobject );
                    }
                    scene.add(tempcurveobjects);
                    selectedcurve = true;
                    curveid = intersects[0].object.name
                    intersect.object.visible = false
                } else {
                    selectedcurve = false;
                    for (let i = 0; i < 20; i++){
                        curveobjects.children[i].material.opacity = 1;
                    }
                }
            } 
            else {
                if (intersects2.length > 0){
                    let num_of_datapoints = data[intersects[0].object.name][0].length;
                    for (let i = 0; i < num_of_datapoints-1; i++){
                        if (tempcurveobjects.children[i].material.opacity != 0.9314){
                            tempcurveobjects.children[i].material.opacity = 0.3;
                        }
                    }
                    const intersect = intersects2[0];
                    intersect.object.material.color.setHex(0xff0000);
                    intersect.object.material.opacity = 0.9314
                    api_set.add(intersect.object.name)
                    fetch('/api', 
                    {   
                        method:'POST', 
                        headers:{'Accept':'application/json', 'Content-type':'application/json'},
                        body: JSON.stringify({input: Array.from(api_set), curveid: curveid})
                    }).then((res) => {
                    fetch('/result').then((res) => res.json()).then((data) => {console.log(data); scene.remove(smallcurveobjects); smallcurveobjects = new THREE.Object3D(); processdata(data)})
                    }).then(() => {
                        if (window.localStorage.getItem('ifsplit') === 'true'){
                            fetch('/resultplot').then((res) => res.json()).then((data) => {
                                console.log(data)
                                changetraction(data['traction'])
                                changeaflow(data['aflow'])
                                changemodulenum(data['module_num'])
                                changetime(data['time'])
                            })
                        }
                    })
                    
                }
            }
        }
        }

        function animate() {

            requestAnimationFrame( animate );
            /*
            controls.update();
            */
            render();

        }

        function render() {

            // find intersections
            //const rotateY = new THREE.Matrix4().makeRotationY( 0.005 );
            //camera.applyMatrix4( rotateY );
            raycaster.setFromCamera( mouse, camera );

            const intersects = raycaster.intersectObjects( curveobjects.children, true );

            if ( intersects.length > 0) {

                sphereInter.visible = true;
                sphereInter.position.copy( intersects[ 0 ].point );

            } else {

                sphereInter.visible = false;

            }

            renderer.render( scene, camera );
            
            var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
            vector.unproject( camera );
            var dir = vector.sub( camera.position ).normalize();
            var distance = - camera.position.z / dir.z;
            pos = camera.position.clone().add( dir.multiplyScalar( distance ) );

            
            if ( toggle > 0.02) {

                spheres[ spheresIndex ].position.copy(pos);
                spheres[ spheresIndex ].scale.set( 1, 1, 1 );
                spheresIndex = ( spheresIndex + 1 ) % spheres.length;

                toggle = 0;

            }
            
            for ( let i = 0; i < spheres.length; i ++ ) {

                const sphere = spheres[ i ];
                sphere.scale.multiplyScalar( 0.97 );
                sphere.scale.clampScalar( 0.01, 10 );

            }
            

            toggle += clock.getDelta();
                
			}    
    }, []);

    const [modalShow, setshow] = useState(false)
    const escFunction = ((event) => {
        if(event.keyCode === 27) {
          setshow(modalShow => !modalShow)
        }
      });
    console.log(window.localStorage.getItem('ifsplit'))
    useEffect(() => {
        document.addEventListener("keydown", escFunction);
        return () => {
          document.removeEventListener("keydown", escFunction);
        };
    }, []);

    if(window.localStorage.getItem('ifsplit') === 'false'){
        return <>
        <div 
            className = 'mainvisualization' 
            style = {{height : '100%', width: window.localStorage.getItem('ifsplit') === 'true'? '50%':'100%', border: '10px solid rgba(0, 0, 0, 0.7)'}} 
            ref = {mainVisRef}
        />
        <MyVerticallyCenteredModal
            show={modalShow}
            backdrop = 'static'
        />
        </>
    } else {
    return <>
        <div style = {{height: '100%', width: '100%' , display:'flex', flexDirection:'row'}}>
            <div 
                className = 'mainvisualization' 
                style = {{height : '100%', width: window.localStorage.getItem('ifsplit') === 'true'? '50%':'100%', border: '10px solid rgba(0, 0, 0, 0.7)'}} 
                ref = {mainVisRef}
            />
            <MyVerticallyCenteredModal
                show={modalShow}
                backdrop = 'static'
            />
            <Dataplot
                traction = {traction}
                aflow = {aflow}
                modulenum = {modulenum}
                time = {time}
            />
        </div>
    </>
    }
}

export default Testapp


