package com.quizcoco.web.entity;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class MatchReport {


private long id;
private LocalDateTime regDate;
private long userId;

private long examQuizzesId;
private long correctWrong;

private long cocoId;
private long enemyId;
private long avatarId;
    
}
