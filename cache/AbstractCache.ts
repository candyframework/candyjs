/**
 * @author afu
 * @license MIT
 */
import ICache from './ICache';

/**
 * 缓存抽象层
 */
abstract class AbstractCache implements ICache {

    /**
     * 进行初始化
     */
    public init() {}

    /**
     * @inheritdoc
     */
    public abstract setSync(key: string, value: string, duration: number): void;

    /**
     * @inheritdoc
     */
    public abstract set(key: string, value: string, duration: number): Promise<any>;

    /**
     * @inheritdoc
     */
    public abstract getSync(key: string): string;

    /**
     * @inheritdoc
     */
    public abstract get(key: string): Promise<any>;

    /**
     * @inheritdoc
     */
    public abstract deleteSync(key: string): void;

    /**
     * @inheritdoc
     */
    public abstract delete(key: string): Promise<any>;

}

export = AbstractCache;
