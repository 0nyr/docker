
/**
 * Remix from : https://lowrey.me/implementing-javas-string-hashcode-in-javascript/.
 * Returns a BigInt number which is the hash of the given string
 * @module GeneralFunctions
 * @param {string} str
 * @returns {bigint} hash
 */
export function hashString(str: string): bigint {
	let hash: bigint = 0n;
	for (let i = 0; i < str.length; i++) {
		hash = hash + ((BigInt(str.charCodeAt(i)) * 31n) ** BigInt(str.length - i));
		//hash = hash & hash; // Convert to 32bit integer
	}
	hash = hash % BigInt(Number.MAX_SAFE_INTEGER);
	return hash;
}
