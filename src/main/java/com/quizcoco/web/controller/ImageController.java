package com.quizcoco.web.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ImageController {
    
    @Value("${file.upload-dir}")
    private String uploadDirBase;

    @GetMapping("/img/user/{userId}/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String userId, @PathVariable String filename) {
        try {
            Path file = Paths.get(System.getProperty("user.dir") + uploadDirBase, userId, filename);
            Resource resource = new UrlResource(file.toUri());

            if(resource.exists() || resource.isReadable()) {
                String contentType = Files.probeContentType(file);
                if(contentType == null) {
                    contentType = "application/octet-stream";
                }

                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.CONTENT_DISPOSITION,"inline; filename=\"" + resource.getFilename() + "\"");
                return ResponseEntity.ok()
                                     .headers(headers)
                                     .contentType(MediaType.parseMediaType(contentType))
                                     .body(resource);
            } else {
                throw new RuntimeException("파일을 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            throw new RuntimeException("파일을 찾을 수 없습니다.", e);
        }
    }
}
