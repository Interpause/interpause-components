/**
 * @file Generates a colorful animated SVG of equilateral triangles on an isogrid.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

/** Very simple RNG used for randomizing the animated triangles. */
export const detRNG = (s: number) => () => ((2 ** 31 - 1) & (s = Math.imul(48271, s))) / 2 ** 31;
/** The seeded RNG function. */
let rand = () => 0.5;
/** Hex color string e.g. #69420f. */
export type HexColor = `#${string}`;
/** Config for SVG generation. */
export interface IsogridProps extends ComponentProps<'svg'> {
  className: string;
  /** Number of rows of triangles generated. */
  rows: number;
  /** Number of columns of triangles generated. */
  cols: number;
  /** Min time in seconds that a triangle can take to cycle through all colors. */
  minSpeed: number;
  /** Max time in seconds that a triangle can take to cycle through all colors. */
  maxSpeed: number;
  /** Size of gap between triangles relative to length of the triangle. Should be between 0-1. */
  gapRatio: number;
  /** Default value is equal to tan(60deg) and forms equilateral triangles. Smaller is flatter. */
  heightRatio: number;
  /** A higher value more aggressively prevents triangles of similar colors being next to each other. Should be between 0-1. */
  randomness: number;
  /** Colors that the triangle will animate between, shuffled for each triangle. */
  colors: HexColor[];
  /** Seed used for RNG. */
  randSeed: number;
  /** SVG scaling method. */
  preserveAspectRatio: `x${'Min'|'Mid'|'Max'}Y${'Min'|'Mid'|'Max'} ${'meet'|'slice'}`|'none';
}
export type IsogridKeys = keyof IsogridProps;

/** Properties each animated triangle has. */
export interface TriProps {
  /** Color sequence which triangle animates between. */
  colorSeq: HexColor[];
  /** Duration of animation in seconds. */
  speed: number;
  /** Coordinates of the vertices. */
  points: string;
}

/** Default config for the generated background. */
export const bgDefaults: Readonly<IsogridProps> = {
  className: '',
  rows: 10,
  cols: 4,
  minSpeed: 20,
  maxSpeed: 50,
  gapRatio: 0.15,
  heightRatio: 1.7320508075688772935274463415059,
  randomness: 0.75,
  randSeed: 31415926535898,
  preserveAspectRatio: 'xMidYMid slice',
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
 * Shuffles color sequence of triangle based on triangle on top and to the left of it.
 * @param above The starting color of the triangle above.
 * @param left The starting color of the immediate left triangle.
 * @param conf The generation config.
 * @returns Smart shuffled copy of conf.colors.
 */
export function smartShuffle(conf: IsogridProps, above?: HexColor, left?: HexColor) {
  let frndarr = conf.colors.slice();
  let shuffled: HexColor[] = [];

  //assuming its in list, highly likely considering context of usage
  if (above && rand() < conf.randomness) frndarr.splice(frndarr.indexOf(above), 1);
  if (left && rand() < conf.randomness) frndarr.splice(frndarr.indexOf(left), 1);

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
 * Generates the color sequence and animation speed for a triangle.
 * @param above The starting color of the triangle above.
 * @param left The starting color of the immediate left triangle.
 * @param conf The generation config.
 * @returns Randomly generated TriProps (excluding points).
 */
export function genTriProps(conf: IsogridProps, above?: HexColor, left?: HexColor) {
  let r_seq = smartShuffle(conf, above, left);
  r_seq.push(r_seq.slice(0, 1)[0]);
  return {
    colorSeq: r_seq,
    speed: Math.floor(rand() * (conf.maxSpeed - conf.minSpeed)) + conf.minSpeed,
    points: '',
  } as TriProps;
}

/** Animated triangle polygon. */
export function Triangle({ colorSeq, speed, points }: TriProps) {
  return (
    <polygon fill={colorSeq[0]} points={points}>
      <animate attributeName="fill" values={`${colorSeq.join(';')}`} dur={`${speed}s`} repeatCount="indefinite" />
    </polygon>
  );
}

import { ComponentProps, memo } from 'react';
/** Generates pretty SVG background. */
export const IsogridBackground = memo(
  (props?: Partial<IsogridProps>) => {
    let conf:IsogridProps = JSON.parse(JSON.stringify(bgDefaults));
    props && (Object.keys(conf) as IsogridKeys[]).forEach(k => {if(typeof props[k] !== 'undefined') (conf as any)[k] = props[k]});

    /** Base of triangles in SVG units. */
    const tlen = 100;
    /** Height of triangles in SVG units, current value forms equilateral triangles. */
    const thgt = (tlen / 2) * conf.heightRatio;
    /** Length of gap between triangles in SVG units. */
    let glen = (tlen / 2) * conf.gapRatio;
    /** Horizontal offset for triangle points in SVG units. */
    let lglen = glen / 2;
    /** Vertical offset for triangle points in SVG units. */
    let hglen = (glen / 2) * 0.866025404;
    /** Width of SVG viewport. */
    let width = tlen * conf.cols;
    /** Height of SVG viewport. */
    let height = thgt * conf.rows + hglen / 4;

    /** Reseed RNG with predetermined seed, this is to make React happy. */
    rand = detRNG(conf.randSeed);

    /** Starting colors of previous row of triangles. */
    let prevarr: HexColor[] = [];
    /** Starting colors of current row of triangles. */
    let curarr: HexColor[] = [];
    /** Starting color of previous triangle. */
    let prevc: HexColor | undefined = undefined;
    /** Flag whether next row should flip. */
    let isUpright = false;

    /** Polygons */
    let triangles: JSX.Element[] = [];
    for (let y = 0; y < conf.rows * 2; y++) {
      isUpright = y % 2 == 0;

      // For first triangle of each row, its split into 2 right angled triangles (wrapped around screen to allow tessellating)
      let tri1 = genTriProps(conf, prevarr[0], prevc);
      let tri2 = Object.assign({}, tri1);
      curarr.push(tri1.colorSeq[0]);
      prevc = tri1.colorSeq[0];

      // Calculation for triangle 1
      let p1x1 = 0;
      let p1y1 = y * thgt + (isUpright ? hglen : glen) / 2;
      let p2x1 = 0;
      let p2y1 = (y + 1) * thgt - (isUpright ? glen : hglen) / 2;
      let p3x1 = tlen / 2 - lglen;
      let p3y1 = isUpright ? y * thgt + hglen / 2 : (y + 1) * thgt - hglen / 2;
      tri1.points = `${p1x1},${p1y1} ${p2x1},${p2y1} ${p3x1},${p3y1}`;
      triangles.push(<Triangle {...tri1} key={triangles.length} />);

      // Calculation for triangle 2
      let p1x2 = width;
      let p1y2 = p1y1;
      let p2x2 = width;
      let p2y2 = p2y1;
      let p3x2 = width - tlen / 2 + lglen;
      let p3y2 = p3y1;
      tri2.points = `${p1x2},${p1y2} ${p2x2},${p2y2} ${p3x2},${p3y2}`;
      triangles.push(<Triangle {...tri2} key={triangles.length} />);

      // For rest of triangles in row
      for (let x = 1; x < conf.cols * 2; x++) {
        let tri = genTriProps(conf, prevarr[x], prevc);
        curarr.push(tri.colorSeq[0]);
        prevc = tri.colorSeq[0];

        // Calculation for equilateral triangle
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
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio={conf.preserveAspectRatio} height="100%" width="100%" className={conf.className}>
        {triangles}
      </svg>
    );
  },
  (prev, next) => JSON.stringify(prev) == JSON.stringify(next)
);
