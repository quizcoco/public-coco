class Coco extends GameObject {
    constructor(config) {
        super(config);
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src,
            useShadow: config.useShadow || false,
            animations: { "idle": [[0, 0]] }, // 애니메이션 프레임 설정
            currentAnimation: "idle",
            animationFrameLimit: 1,
            width: config.width || 32,
            height: config.height || 31,
        });
    }

    update(state) {
        // 코코의 움직임이나 상태를 업데이트
        this.sprite.setAnimation(state.isMoving ? "walk" : "idle");
    }
}