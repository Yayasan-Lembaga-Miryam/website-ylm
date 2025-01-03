<?php

namespace App\Helpers;

class BotDetector
{
    /**
     * Common bot signatures in user agents
     */
    private static $botSignatures = [
        'bot',
        'crawler',
        'spider',
        'ping',
        'googlebot',
        'bingbot',
        'yahoo',
        'baidu',
        'slurp',
        'yandex',
        'sogou',
        'exabot',
        'facebookexternalhit',
        'alexa',
        'curl',
        'wget',
        'scrapy',
        'python',
        'semrushbot',
        'ahrefsbot',
        'mj12bot',
        'dotbot',
        'rogerbot',
    ];

    /**
     * Check if the current request is from a bot
     */
    public static function isBot(): bool
    {
        $userAgent = request()->header('User-Agent');

        if (empty($userAgent)) {
            return true; // No user agent = probably a bot
        }

        $userAgent = strtolower($userAgent);

        // Check common bot signatures
        foreach (self::$botSignatures as $signature) {
            if (str_contains($userAgent, $signature)) {
                return true;
            }
        }

        // Check if request has common browser characteristics
        $acceptLanguage = request()->header('Accept-Language');
        $acceptEncoding = request()->header('Accept-Encoding');

        if (empty($acceptLanguage) && empty($acceptEncoding)) {
            return true; // Most real browsers send these headers
        }

        return false;
    }
}
