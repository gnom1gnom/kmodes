import { parseCsvFile } from "../parser";
import * as R from "ramda";
import { classifyVectors, kmodes } from "../../index";
import { getDistancesBetweenModes, getDistancesInCluster } from "../validation";


const votesFile: string[][] = R.dropLast(1, parseCsvFile('/home/ubuntu/projects/kmodes/src/icebreaker/kontrolna2.csv'));

// const fullRecords = votesFile.filter(f => !f.some(item => item === '?'));
const fullRecords = votesFile;

const kmodesResult = kmodes(fullRecords, 2, 10, 20, R.drop(1), true);



console.log('Classified vectors: ');
classifyVectors(fullRecords, kmodesResult.best.clusters, R.drop(1)).forEach(v => console.log(JSON.stringify(v)));

// console.log('Democrats in cluster 0: ' + kmodesResult.best.clusters[0].vectors.filter(fr => fr[0] === 'democrat').length);
// console.log('Democrats in cluster 1: ' + kmodesResult.best.clusters[1].vectors.filter(fr => fr[0] === 'democrat').length);
// console.log('Republicans in cluster 0: ' + kmodesResult.best.clusters[0].vectors.filter(fr => fr[0] === 'republican').length);
// console.log('Republicans in cluster 1: ' + kmodesResult.best.clusters[1].vectors.filter(fr => fr[0] === 'republican').length);

console.log(kmodesResult.validation)
/*

let distancesCluster0 = getDistancesInCluster(kmodesResult.best.clusters[0]).filter(i => i> 0);
let distancesCluster1 = getDistancesInCluster(kmodesResult.best.clusters[1]).filter(i => i> 0);
let distancesBetweenModes = getDistancesBetweenModes(kmodesResult.best.clusters).filter(i => i> 0);

console.log('Mean distance in cluster 0: ' + R.mean(distancesCluster0));
console.log('Mean distance in cluster 1: ' + R.mean(distancesCluster1));
console.log('Min distance between clusters: ' + Math.max(...distancesBetweenModes));*/
