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
public class UserQuizzesFavorite {

    private long id;
    private long userId;
    private long userMultipleChoiceQuizId;
    private long userShortAnswerQuizId;
    private long userOxId;
    private LocalDateTime regDate;

}
