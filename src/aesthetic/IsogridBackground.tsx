/**
 * @file Pure JS SVG generator I made long ago updated using jsx (refrained from renaming variables). Used in my phone game and other places I needed a background for.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */
/** Very fast barely RNG random number generator */
const detRNG = (s: number) => () => ((2 ** 31 - 1) & (s = Math.imul(48271, s))) / 2 ** 31;
let rand = () => 0.5;
/** string of format #{string} */
export type HexColor = string; //`#${string}`; type template literals are broken on typescript 4.1.3, and for some reason yarn cant install the beta version with some error I cannot resolve
/** Configuration settings for background generation */
export interface IsogridConfig {
  /** rows of triangles generated in background */
  rows: number;
  /** cols of triangles generated in background */
  cols: number;
  /** min cycle time for colors in seconds */
  min_speed: number;
  /** max cycle time for colors in seconds */
  max_speed: number;
  /** size of gap between triangles relative to triangles themselves */
  gap_ratio: number;
  /** randomness of the smart random algorithm */
  randomness: number;
  /** shuffled colors that triangles will change between */
  colors: HexColor[];
  /** Seed used for deterministic random number generation */
  rand_seed: number;
}
export type IsogridKeys = keyof IsogridConfig;

/** properties each animated triangle has */
export interface TriangleProps {
  /** sequence of colors triangle animates through */
  color_seq: HexColor[];
  /** duration of animation in seconds */
  speed: number;
  /** coordinates of vertices */
  points: string;
}

/** Default settings for the generated background. */
export const bgDefaults: Readonly<IsogridConfig> = {
  rows: 10,
  cols: 4,
  min_speed: 20,
  max_speed: 50,
  gap_ratio: 0.15,
  randomness: 0.75,
  rand_seed: 31415926535898,
  colors: [
    '#ffffff',
    '#0c7c5f',
    '#000000',
    '#fab20b',
    '#e62840',
    '#8862b8',
    '#fddb0d',
    '#deddde',
    '#ffffff',
    '#0c7c5f',
    '#000000',
  ],
};

/**
 * Shuffles color sequence of triangle based on triangle on top and to the left of it
 * @param above the starting color of the triangle above
 * @param left the starting color of the immediate left triangle
 * @param conf the generation config
 */
function smart_shuffle(conf: IsogridConfig, above?: HexColor, left?: HexColor) {
  let frndarr = conf.colors.slice();
  let shuffled: HexColor[] = [];

  //assuming its in list, highly likely considering context of usage
  if (rand() < conf.randomness && typeof above !== 'undefined') frndarr.splice(frndarr.indexOf(above), 1);
  if (rand() < conf.randomness && typeof left !== 'undefined') frndarr.splice(frndarr.indexOf(left), 1);

  shuffled.push(frndarr[Math.floor(rand() * frndarr.length)]);
  let nrndarr = conf.colors.slice();
  nrndarr.splice(nrndarr.indexOf(shuffled[0]), 1);

  for (let i = nrndarr.length - 1; i > 0; i--) {
    let j = Math.floor(rand() * (i + 1));
    [nrndarr[i], nrndarr[j]] = [nrndarr[j], nrndarr[i]];
  }

  return shuffled.concat(nrndarr);
}

/**
 * generates the color sequence and animation speed for a triangle
 * @param above the starting color of the triangle above
 * @param left the starting color of the immediate left triangle
 * @param conf the generation config
 */
function gen_tri(conf: IsogridConfig, above?: HexColor, left?: HexColor) {
  let r_seq = smart_shuffle(conf, above, left);
  r_seq.push(r_seq.slice(0, 1)[0]);
  return {
    color_seq: r_seq,
    speed: Math.floor(rand() * (conf.max_speed - conf.min_speed)) + conf.min_speed,
    points: '',
  } as TriangleProps;
}

/** Makes triangle */
function Triangle({ color_seq, speed, points }: TriangleProps) {
  return (
    <polygon fill={color_seq[0]} points={points}>
      <animate attributeName="fill" values={`${color_seq.join(';')}`} dur={`${speed}s`} repeatCount="indefinite" />
    </polygon>
  );
}

import { memo } from 'react';
/** Generates SVG background. */
export const IsogridBackground = memo(
  (props?: Partial<IsogridConfig>) => {
    let conf: IsogridConfig = JSON.parse(JSON.stringify(bgDefaults));
    (Object.entries(props ?? {}) as [IsogridKeys, any][]).forEach(([k, v]) => (conf[k] = v));

    /** Base of triangles in arbitrary SVG units */
    const tlen = 100;
    /** Height of triangles in arbitrary SVG units, current value forms equilateral triangles. TODO consider effects of changing thgt */
    const thgt = (tlen / 2) * 1.732050808;
    /** Length of gap between triangles in arbitrary SVG units */
    let glen = (tlen / 2) * conf.gap_ratio;
    /** Horizontal offset for triangle points in arbitrary SVG units */
    let lglen = glen / 2;
    /** Vertical offset for triangle points in arbitrary SVG units */
    let hglen = (glen / 2) * 0.866025404;
    /** Width of SVG */
    let width = tlen * conf.cols;
    /** Height of SVG */
    let height = thgt * conf.rows + hglen / 4;

    /** Reseed predetermined RNG generator, this is to make React happy. */
    rand = detRNG(conf.rand_seed);

    /** Starting colors of previous row of triangles */
    let prevarr: HexColor[] = [];
    /** Starting colors of current row of triangles */
    let curarr: HexColor[] = [];
    /** Starting color of previous triangle */
    let prevc: HexColor | undefined = undefined;
    /** Flag whether next row should flip */
    let isUpright = false;

    /** polygons */
    let triangles: JSX.Element[] = [];
    for (let y = 0; y < conf.rows * 2; y++) {
      isUpright = y % 2 == 0;

      //For first triangle of each row, its split into 2 right angled triangles (wrapped around screen for to allow tessellating)
      let tri1 = gen_tri(conf, prevarr[0], prevc);
      let tri2 = Object.assign({}, tri1);
      curarr.push(tri1.color_seq[0]);
      prevc = tri1.color_seq[0];

      //Calculation for triangle 1
      let p1x1 = 0;
      let p1y1 = y * thgt + (isUpright ? hglen : glen) / 2;
      let p2x1 = 0;
      let p2y1 = (y + 1) * thgt - (isUpright ? glen : hglen) / 2;
      let p3x1 = tlen / 2 - lglen;
      let p3y1 = isUpright ? y * thgt + hglen / 2 : (y + 1) * thgt - hglen / 2;
      tri1.points = `${p1x1},${p1y1} ${p2x1},${p2y1} ${p3x1},${p3y1}`;
      triangles.push(<Triangle {...tri1} key={triangles.length} />);

      //Calculation for triangle 2
      let p1x2 = width;
      let p1y2 = p1y1;
      let p2x2 = width;
      let p2y2 = p2y1;
      let p3x2 = width - tlen / 2 + lglen;
      let p3y2 = p3y1;
      tri2.points = `${p1x2},${p1y2} ${p2x2},${p2y2} ${p3x2},${p3y2}`;
      triangles.push(<Triangle {...tri2} key={triangles.length} />);

      //For rest of triangles in row
      for (let x = 1; x < conf.cols * 2; x++) {
        let tri = gen_tri(conf, prevarr[x], prevc);
        curarr.push(tri.color_seq[0]);
        prevc = tri.color_seq[0];

        //Calculation for equilateral triangle
        let p1x = ((x - 1) * tlen) / 2 + lglen;
        let p1y = isUpright ? (y + 1) * thgt - hglen / 2 : y * thgt + hglen / 2;
        let p2x = ((x + 1) * tlen) / 2 - lglen;
        let p2y = isUpright ? (y + 1) * thgt - hglen / 2 : y * thgt + hglen / 2;
        let p3x = (x * tlen) / 2;
        let p3y = isUpright ? y * thgt + glen / 2 : (y + 1) * thgt - glen / 2;
        tri.points = `${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y}`;
        triangles.push(<Triangle {...tri} key={triangles.length} />);

        isUpright = !isUpright;
      }
      prevc = undefined;
      prevarr = curarr;
      curarr = [];
    }

    return (
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" height="100%" width="100%">
        {triangles}
      </svg>
    );
  },
  (prev, next) => JSON.stringify(prev) == JSON.stringify(next)
);
